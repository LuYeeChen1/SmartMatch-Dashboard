<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">HR Dashboard<span v-if="fullName">: {{ fullName }}</span></h1>
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
          <h1 class="text-2xl font-bold mb-2">HR Dashboard</h1>
          <!-- Search Input -->
          <div class="mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search job title, company, or skills..."
              class="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <!-- Loading -->
          <div v-if="isLoading" class="text-center py-10 text-gray-500">Loading job postings...</div>

          <!-- No Jobs Found -->
          <div v-else-if="filteredJobs.length === 0" class="text-center py-10 text-gray-500">
            No job postings found.
            <div>
              <button @click="clearSearch" class="mt-4 text-blue-600 hover:underline">Clear Search</button>
            </div>
          </div>

          <!-- Job Cards -->
          <div v-else class="grid gap-4">
            <div
              v-for="job in filteredJobs"
              :key="job.id"
              class="bg-white border border-gray-200 rounded p-4"
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
      searchQuery: '',
      isLoading: true,
      userEmail: localStorage.getItem('user_email') || '',
      fullName: localStorage.getItem('full_name') || ''
    };
  },
  computed: {
    filteredJobs() {
      if (!Array.isArray(this.jobs)) return [];
      const query = this.searchQuery.toLowerCase();
      return this.jobs.filter(job =>
        (job.job_title || '').toLowerCase().includes(query) ||
        (job.company_name || '').toLowerCase().includes(query) ||
        (job.skills_required || '').toLowerCase().includes(query) ||
        (job.location || '').toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await fetch("http://localhost:8001/jobDashboardData");
        this.jobs = await response.json();
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Failed to load jobs.");
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    clearSearch() {
      this.searchQuery = '';
    },
    logout() {
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      localStorage.removeItem('full_name');
      this.$router.push('/');
    }
  }
};
</script>
