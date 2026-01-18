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
        <div class="w-full max-w-3xl bg-white rounded-xl shadow p-8">
          <h1 class="text-2xl font-bold mb-6">My Job Applications</h1>
          <div v-if="loading" class="text-center py-6 text-gray-500">Loading...</div>
          <div v-else>
            <div v-if="applications.length === 0" class="text-gray-500">No applications found.</div>
            <div v-else class="space-y-4">
              <div
                v-for="app in applications"
                :key="app.id"
                class="bg-white p-4 rounded shadow border"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-medium text-lg">{{ app.job_title }}</div>
                    <div class="text-sm text-gray-600">{{ app.company_name }}</div>
                    <div class="text-sm mt-1">
                      <span class="font-semibold">Your Status:</span>
                      <span :class="statusClass(app.jobseeker_status)">{{ app.jobseeker_status }}</span>
                      <span class="ml-4 font-semibold">HR Status:</span>
                      <span :class="statusClass(app.hr_status)">{{ app.hr_status }}</span>
                    </div>
                    <div class="text-xs text-gray-400">
                      Applied: {{ formatDate(app.applied_at) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationTracking',
  data() {
    return {
      applications: [],
      loading: false,
      userEmail: localStorage.getItem('user_email') || ''
    };
  },
  methods: {
    async fetchApplications() {
      if (!this.userEmail) return;
      this.loading = true;
      try {
        const res = await fetch(`http://localhost:8001/job_applications?jobseeker_email=${this.userEmail}`);
        const data = await res.json();
        // Map to ensure jobseeker_status and hr_status fields exist
        this.applications = data.map(app => ({
          ...app,
          jobseeker_status: app.jobseeker_status || app.jobseekerStatus || '',
          hr_status: app.hr_status || app.hrStatus || ''
        }));
        console.log('Fetched applications:', this.applications);
      } catch {
          this.applications = [];
      } finally {
          this.loading = false;
      }
    },
    statusClass(status) {
      return {
        submitted: 'text-blue-600',
        accepted: 'text-green-600',
        rejected: 'text-red-500',
        pending: 'text-yellow-600',
        cancelled: 'text-gray-400'
      }[status] || 'text-gray-500';
    },
    formatDate(dateStr) {
      return dateStr ? new Date(dateStr).toLocaleString() : '';
    },
    logout() {
      localStorage.removeItem("full_name");
      localStorage.removeItem("user_role");
      localStorage.removeItem("email");
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchApplications();
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
