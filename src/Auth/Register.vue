<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-md rounded-lg w-full max-w-xl p-8">
      <h2 class="text-3xl font-bold text-center mb-2">Create Your Account</h2>
      <p class="text-center text-gray-600 mb-6">Join our community today</p>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input v-model="form.fullName" type="text" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="w-full border px-3 py-2 rounded" required />
        </div>

        <div class="flex items-center text-sm">
          <input type="checkbox" v-model="showPassword" class="mr-2" />
          <label>Show Password</label>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
          <select v-model="form.userRole" class="w-full border px-3 py-2 rounded" required>
            <option value="" disabled>Select a role</option>
            <option value="job_seeker">Job Seeker</option>
            <option value="human_resource">Human Resource</option>
            <option value="lecturer">Lecturer</option>
          </select>
        </div>

        <div class="flex items-start">
          <input type="checkbox" id="terms" v-model="form.agreed" class="mt-1 mr-2" />
          <label for="terms" class="text-sm text-gray-600">
            I agree to the
            <a href="#" class="text-blue-600 hover:underline">terms and conditions</a>
          </label>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {{ isLoading ? 'Creating Account...' : 'Create Account' }}
        </button>

        <p class="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <router-link to="/" class="text-blue-600 hover:underline">Sign in here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userRole: '',
        agreed: false
      },
      showPassword: false,
      showConfirmPassword: false,
      isLoading: false
    };
  },
  methods: {
    async submitForm() {
      if (!this.form.agreed) {
        alert("You must agree to the terms.");
        return;
      }
      if (this.form.password !== this.form.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      if (!this.form.userRole) {
        alert("Please select a role.");
        return;
      }

      this.isLoading = true;
      const formData = new FormData();
      formData.append("full_name", this.form.fullName);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("user_role", this.form.userRole);

      try {
        const response = await fetch("http://localhost:8001/register", {
          method: "POST",
          body: formData
        });

        const result = await response.json();
        if (!response.ok) {
          alert("Registration failed: " + (result.message || result.detail || "Unknown error."));
          return;
        }

        alert("Registration successful! Please sign in.");
        this.$router.push("/");
      } catch (err) {
        alert("Registration failed: " + err.message);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
