<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">HR Dashboard: {{ fullName }}</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">Logout</button>
      </div>
    </header>
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <router-link to="/hr/dashboard" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Dashboard</router-link>
        <router-link to="/jobPosting" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Post a Job</router-link>
        <router-link to="/hr/manage-jobs" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Manage Jobs</router-link>
        <router-link to="/hr/candidate-matching" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Candidate Matching</router-link>
        <router-link to="/hr/applicants" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">View Applicants</router-link>
      </aside>
      <!-- Main Content -->
      <main class="flex-1 p-8 bg-gray-50">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">Job Applicants</h1>
          <div v-if="applications.length === 0" class="text-gray-500 text-center py-8">
            No applicants found for your jobs.
          </div>
          <div v-else class="grid gap-4">
            <div v-for="app in applications" :key="app.id" class="bg-white border border-gray-200 rounded p-4 relative">
              <div class="mb-2">
                <h2 class="text-lg font-semibold">{{ app.job_title }}</h2>
                <p class="text-sm text-gray-600">{{ app.company_name }}</p>
                <p class="text-xs text-gray-500">Applicant: {{ app.applicant_email }}</p>
                <p class="text-xs text-gray-500">HR Email: {{ app.hr_email }}</p>
                <p class="text-xs text-gray-500">Jobseeker Status: {{ app.jobseeker_status }}</p>
                <p class="text-xs text-gray-500">Applied At: {{ app.applied_at }}</p>
                <p class="text-xs text-gray-500">Updated At: {{ app.updated_at }}</p>
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Status:
                <span
                  :class="{
                    'text-green-600': app.hr_status === 'accepted',
                    'text-red-600': app.hr_status === 'rejected',
                    'text-yellow-600': app.hr_status === 'pending'
                  }"
                >
                  {{ app.hr_status }}
                </span>
              </div>
              <div class="absolute bottom-4 right-4 flex space-x-2">
                <template v-if="app.hr_status === 'pending'">
                  <button @click="updateStatus(app.id, 'accepted')" class="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                  <button @click="updateStatus(app.id, 'rejected')" class="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                </template>
                <template v-else>
                  <span
                    :class="{
                      'text-green-600 font-bold': app.hr_status === 'accepted',
                      'text-red-600 font-bold': app.hr_status === 'rejected'
                    }"
                  >
                    {{ app.hr_status.charAt(0).toUpperCase() + app.hr_status.slice(1) }}
                  </span>
                </template>
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
  data() {
    return { applications: [], fullName: localStorage.getItem('full_name') || '' };
  },
  async mounted() {
    const hr_email = localStorage.getItem('user_email');
    if (!hr_email) return;
    const res = await fetch(`http://localhost:8001/job_applications?hr_email=${hr_email}`);
    this.applications = await res.json();
  },
  methods: {
    async updateStatus(id, status) {
      try {
        const response = await fetch('http://localhost:8001/update_application_status', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ application_id: id, hr_status: status })
        });
        const result = await response.json();
        if (result.success) {
          // Update the status in the local applications array for instant UI feedback
          const app = this.applications.find(a => a.id === id);
          if (app) app.hr_status = status;
        } else {
          alert('Failed to update status.');
        }
      } catch (e) {
        alert('Error updating status.');
      }
    },
    async deleteApplication(id) {
      if (confirm('Are you sure you want to delete this application?')) {
        try {
          const response = await fetch(`http://localhost:8001/delete_application?application_id=${id}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          if (result.success) {
            this.applications = this.applications.filter(app => app.id !== id);
            alert('Application deleted successfully.');
          } else {
            alert('Failed to delete application.');
          }
        } catch (e) {
          alert('Error deleting application.');
        }
      }
    },
    logout() {
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
table { width: 100%; }
th, td { text-align: left; }
</style> 