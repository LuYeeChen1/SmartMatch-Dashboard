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
          <h1 class="text-2xl font-bold mb-6">Candidate Matching</h1>

          <!-- Step 1: List Job Postings -->
          <div v-if="!selectedJob">
            <h2 class="text-lg font-semibold mb-4">Select a Job Posting</h2>
            <div v-if="jobPostings.length === 0" class="text-gray-500 text-center py-8">
              No job postings found.
          </div>
          <div v-else class="grid gap-4">
              <div v-for="job in jobPostings" :key="job.id" class="bg-white border border-gray-200 rounded p-4 relative">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h2 class="text-lg font-semibold">{{ job.job_title }}</h2>
                    <p class="text-sm text-gray-600">{{ job.company_name }}</p>
                    <p class="text-xs text-gray-500">Posted by: {{ job.email }}</p>
                  </div>
                  <span v-if="job.is_verified" class="text-green-600 text-sm font-medium">✓ Verified</span>
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
                <button @click="selectJob(job)" class="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Select</button>
              </div>
            </div>
          </div>

          <!-- Step 2: Show Matched Candidates -->
          <div v-else>
            <button @click="selectedJob = null; matchedCandidates = []" class="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded">Back to Job List</button>
            <h2 class="text-lg font-semibold mb-4">Matched Candidates for: <span class="font-bold">{{ selectedJob.job_title }}</span></h2>
            <div v-if="loadingCandidates" class="text-center text-gray-500">Loading matched candidates...</div>
            <div v-else-if="matchedCandidates.length === 0" class="text-gray-500 text-center py-8">
              No matched candidates found.
            </div>
            <div v-else>
              <table class="min-w-full bg-white border border-gray-200 rounded mb-6">
                <thead>
                  <tr>
                    <th class="px-4 py-2 border-b text-left">Name / Email</th>
                    <th class="px-4 py-2 border-b text-left">Skills</th>
                    <th class="px-4 py-2 border-b text-left">Education</th>
                    <th class="px-4 py-2 border-b text-left">Experience</th>
                    <th class="px-4 py-2 border-b text-left">Similarity</th>
                    <th class="px-4 py-2 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="candidate in matchedCandidates" :key="candidate.email">
                    <td class="px-4 py-2 border-b">{{ candidate.full_name || candidate.email }}</td>
                    <td class="px-4 py-2 border-b">{{ candidate.skill_learned || candidate.skills || '-' }}</td>
                    <td class="px-4 py-2 border-b">{{ candidate.education }}</td>
                    <td class="px-4 py-2 border-b">{{ candidate.experience }}</td>
                    <td class="px-4 py-2 border-b">{{ (candidate.similarity_score !== undefined ? candidate.similarity_score : (candidate.score !== undefined ? candidate.score : 0)).toFixed(3) }}</td>
                    <td class="px-4 py-2 border-b">
                      <button @click="viewDetail(candidate.email)" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">View Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Modal for Candidate Details -->
          <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-200">
              <button @click="showDetail = false" class="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
              <h2 class="text-xl font-bold mb-4">Candidate Details</h2>
              <div v-if="detailLoading" class="text-center text-gray-500">Loading...</div>
              <div v-else-if="detailError" class="text-center text-red-500">{{ detailError }}</div>
              <div v-else-if="candidateDetail">
                <div class="mb-2"><span class="font-semibold">Email:</span> {{ candidateDetail.email }}</div>
                <div class="mb-2"><span class="font-semibold">Intro:</span> {{ candidateDetail.intro }}</div>
                <div class="mb-2"><span class="font-semibold">Education:</span> {{ candidateDetail.education }}</div>
                <div class="mb-2"><span class="font-semibold">Experience:</span> {{ candidateDetail.experience }}</div>
                <div v-if="candidateDetail.skills" class="mb-2"><span class="font-semibold">Skills:</span> {{ candidateDetail.skills }}</div>
                <div v-if="candidateDetail.other_info" class="mb-2"><span class="font-semibold">Other Info:</span> {{ candidateDetail.other_info }}</div>
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
    return {
      jobPostings: [],
      selectedJob: null,
      matchedCandidates: [],
      loadingCandidates: false,
      showDetail: false,
      candidateDetail: null,
      detailLoading: false,
      detailError: '',
      fullName: localStorage.getItem('full_name') || ''
    };
  },
  async mounted() {
    const email = localStorage.getItem('user_email');
    if (!email) return;
    try {
      const res = await fetch(`http://localhost:8001/hr/jobs?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Failed to fetch jobs.');
      this.jobPostings = await res.json();
    } catch {
      this.jobPostings = [];
    }
  },
  methods: {
    async selectJob(job) {
      this.selectedJob = job;
      this.matchedCandidates = [];
      this.loadingCandidates = true;
      try {
        const res = await fetch(`http://localhost:8001/candidateMatching?job_id=${job.id}`);
        this.matchedCandidates = await res.json();
      } catch {
        this.matchedCandidates = [];
      } finally {
        this.loadingCandidates = false;
      }
    },
    async viewDetail(email) {
      this.showDetail = true;
      this.candidateDetail = null;
      this.detailLoading = true;
      this.detailError = '';
      try {
        const res = await fetch(`http://localhost:8001/portfolio?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (data.success && data.portfolio) {
          this.candidateDetail = data.portfolio;
        } else {
          this.detailError = 'No portfolio found for this user.';
        }
      } catch (e) {
        this.detailError = 'Failed to load details.';
      } finally {
        this.detailLoading = false;
      }
    },
    logout() {
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      this.$router.push('/');
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
};
</script>
