<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Jobseeker Dashboard</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">Logout</button>
      </div>
    </header>
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <router-link to="/jobseeker/resume" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Resume</router-link>
        <router-link to="/jobseeker/dashboard" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Job Dashboard</router-link>
        <router-link to="/jobseeker/job-recommend" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Job Recommendation</router-link>
        <router-link to="/jobseeker/application-tracking" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Track My Applications</router-link>
        <router-link to="/jobseeker/course-list" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Join Course</router-link>
      </aside>
      <!-- Main Content -->
      <main class="flex-1 p-8 bg-gray-50 flex flex-col items-center justify-center">
        <div class="w-full max-w-xl bg-white rounded-xl shadow p-8">
          <h2 class="text-2xl font-bold mb-4 text-center">Welcome, {{ fullName }}</h2>
          <p class="text-gray-600 text-center">Use the sidebar to navigate your jobseeker features.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: localStorage.getItem("full_name") || "Job Seeker"
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("full_name");
      localStorage.removeItem("user_role");
      localStorage.removeItem("email");
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
