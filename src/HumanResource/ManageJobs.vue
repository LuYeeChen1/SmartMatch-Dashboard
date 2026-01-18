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
          <h1 class="text-2xl font-bold mb-2">Manage Your Jobs</h1>
          <div v-if="isLoading" class="text-center py-10 text-gray-500">Loading jobs...</div>
          <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
          <div v-else-if="jobs.length === 0" class="text-center py-10 text-gray-500">
            No jobs to manage.
          </div>
          <div v-else class="grid gap-4">
            <div
              v-for="job in jobs"
              :key="job.id"
              class="bg-white border border-gray-200 rounded p-4 relative"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h2 class="text-lg font-semibold">{{ job.job_title }}</h2>
                  <p class="text-sm text-gray-600">{{ job.company_name }}</p>
                  <p class="text-xs text-gray-500">Posted by: {{ job.email }}</p>
                </div>
                <span
                  v-if="job.is_verified"
                  class="text-green-600 text-sm font-medium"
                >
                  ✓ Verified
                </span>
              </div>
              <p class="text-sm text-gray-700 mb-2">{{ job.job_description }}</p>
              <div class="text-sm text-gray-600 mb-2">
                Skills: <span class="text-black">{{ job.skills_required }}</span>
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Location: {{ job.location }}, {{ job.country }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Education: {{ job.education_required }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                Contact: {{ job.contact_number }}
              </div>
              <div v-if="job.company_link" class="text-sm text-blue-600 mb-2">
                <a :href="job.company_link" target="_blank" class="hover:underline">Company Website</a>
              </div>
              <div v-if="job.other" class="text-sm text-yellow-800 bg-yellow-100 p-2 rounded mb-2">
                {{ job.other }}
              </div>
              <div class="text-sm text-gray-500">Posted on {{ formatDate(job.date_posted) }}</div>
              <button
                @click="deleteJob(job.id)"
                class="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
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
    return {
      jobs: [],
      isLoading: true,
      error: '',
      userEmail: localStorage.getItem('user_email') || '',
      fullName: localStorage.getItem('full_name') || ''
    };
  },
  async mounted() {
    const email = localStorage.getItem('user_email');
    if (!email) {
      this.isLoading = false;
      this.error = 'You must be logged in as HR to manage jobs.';
      return;
    }
    try {
      const res = await fetch(`http://localhost:8001/hr/jobs?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Failed to fetch jobs.');
      this.jobs = await res.json();
    } catch (err) {
      this.error = 'Failed to fetch jobs.';
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    async deleteJob(id) {
      if (confirm('Are you sure you want to delete this job?')) {
        try {
          await fetch(`http://localhost:8001/delete_job?job_id=${id}`, {
            method: 'DELETE'
          });
          this.jobs = this.jobs.filter(j => j.id !== id);
        } catch (err) {
          alert('Failed to delete job.');
        }
      }
    },
    logout() {
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      this.$router.push('/');
    }
  }
};
</script>
