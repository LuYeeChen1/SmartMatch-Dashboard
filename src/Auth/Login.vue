<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-md rounded-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
      <p class="text-sm text-center text-gray-600 mb-6">Sign in to your account</p>

      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center">
            <input type="checkbox" v-model="showPassword" class="mr-2">
            Show password
          </label>
          <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>

        <p class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <router-link to="/register" class="text-blue-600 hover:underline">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false
    };
  },
  methods: {
    async submitLogin() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);

      try {
        const response = await fetch("http://localhost:8001/login", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (!response.ok) {
          alert(result.detail || "Login failed");
          return;
        }

        localStorage.setItem("full_name", result.full_name);
        localStorage.setItem("user_role", result.user_role);
        localStorage.setItem("user_email", this.email);

        const roleRoutes = {
          human_resource: "/hr/dashboard",
          job_seeker: "/JobSeekerMenu",
          lecturer: "/lecturer/dashboard",
          admin: "/admin/dashboard"
        };

        this.$router.push(roleRoutes[result.user_role] || "/");
      } catch (error) {
        alert("Error logging in: " + error.message);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
