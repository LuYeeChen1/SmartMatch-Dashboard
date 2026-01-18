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
      <main class="flex-1 p-8 bg-gray-50">
        <div class="max-w-6xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold">Hi, {{ fullName }}</h1>
            <p class="text-lg text-gray-600">Find your next opportunity below</p>
          </div>

          <!-- Search Bar -->
          <div class="mb-6">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search job title, company, location, or skills..."
              class="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>

          <!-- Warning -->
          <div class="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mb-6">
            Do not pay for job applications. Real employers won’t ask for fees.
          </div>

          <!-- Loading -->
          <div v-if="isLoading" class="text-center py-10">
            <div class="spinner mb-4"></div>
            <p class="text-gray-500">Loading jobs...</p>
          </div>

          <!-- No Jobs Found -->
          <div v-else-if="filteredJobs.length === 0" class="text-center text-gray-500 py-10">
            No jobs found. Try different search terms.
          </div>

          <!-- Job Cards -->
          <div v-else class="space-y-6">
            <div
              v-for="job in filteredJobs"
              :key="job.id"
              class="p-6 border rounded shadow-sm bg-white"
            >
              <div class="flex justify-between items-center mb-2">
                <div>
                  <h3 class="text-xl font-semibold">{{ job.job_title }}</h3>
                  <p class="text-sm text-gray-600">{{ job.company_name }}</p>
                  <p class="text-xs text-gray-500">Posted by: {{ job.email }}</p>
                  <p class="text-xs text-gray-500 mt-1">Your Email: <span class="font-semibold">{{ userEmail }}</span></p>
                </div>
                <span v-if="job.is_verified" class="text-green-600 text-sm">✔ Verified</span>
              </div>

              <p class="text-sm text-gray-700 mb-2 line-clamp-3">{{ job.job_description }}</p>

              <div class="text-sm text-gray-600 mb-1">
                <strong>Skills:</strong> {{ job.skills_required }}
              </div>
              <div class="text-sm text-gray-600 mb-1">
                <strong>Education:</strong> {{ job.education_required }}
              </div>
              <div class="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {{ job.location }}, {{ job.country }}
              </div>
              <div class="text-sm text-gray-600 mb-1">
                <strong>Contact:</strong> {{ job.contact_number }}
              </div>

              <div v-if="job.company_link" class="text-sm text-blue-600">
                <a :href="job.company_link" target="_blank" class="hover:underline">Visit Company Site</a>
              </div>

              <div class="text-sm text-gray-500 mt-2">Posted on {{ formatDate(job.date_posted) }}</div>

              <button
                v-if="userRole === 'job_seeker'"
                :disabled="job.has_applied"
                @click="applyJob(job)"
                :class="['mt-4 px-4 py-2 rounded font-semibold', job.has_applied ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700']"
              >
                {{ job.has_applied ? 'Applied' : 'Apply Now' }}
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
      fullName: '',
      jobs: [],
      searchQuery: '',
      isLoading: true,
      userEmail: localStorage.getItem('user_email') || '',
      userRole: localStorage.getItem('user_role') || '',
    };
  },
  computed: {
    filteredJobs() {
      const q = this.searchQuery.toLowerCase();
      return this.jobs.filter(job =>
        [job.job_title, job.company_name, job.skills_required, job.location]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
  },
  async mounted() {
    this.fullName = localStorage.getItem('full_name') || 'User';
    await this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      try {
        const res = await fetch(`http://localhost:8001/jobDashboardData?jobseeker_email=${encodeURIComponent(this.userEmail)}`);
        this.jobs = await res.json();
      } catch {
        alert('Failed to fetch jobs.');
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async applyJob(job) {
      const formData = new FormData();
      formData.append('jobseeker_email', this.userEmail);
      formData.append('job_id', job.id); // Ensure job_id is included
      formData.append('hr_email', job.email);
      formData.append('job_title', job.job_title);
      formData.append('company_name', job.company_name);
      try {
        const res = await fetch('http://localhost:8001/apply_job', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          alert('Application submitted!');
          job.has_applied = true; // Update the job in-place
        } else {
          alert(data.message || 'Failed to apply.');
        }
      } catch (e) {
        alert('Failed to apply.');
      }
    },
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
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
