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
      <main class="flex-1 p-8 bg-gray-50 flex flex-col items-center justify-center">
        <div class="w-full max-w-2xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">Post a New Job</h1>
          <form @submit.prevent="submitJob" class="space-y-6 bg-white p-6 rounded shadow">
            <div>
              <label class="block text-sm font-medium mb-1">Job Title</label>
              <input v-model="job.job_title" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Job Description</label>
              <textarea v-model="job.job_description" rows="4" required class="w-full border px-3 py-2 rounded"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Skills Required</label>
              <input v-model="job.skills_required" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Education Required</label>
              <input v-model="job.education_required" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Location</label>
              <input v-model="job.location" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Country</label>
              <input v-model="job.country" type="text" required class="w-full border px-3 py-2 rounded" />
            </div>
            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
              Post Job
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        job_title: '',
        job_description: '',
        skills_required: '',
        education_required: '',
        location: '',
        country: ''
      },
      fullName: localStorage.getItem('full_name') || ''
    };
  },
  methods: {
    async submitJob() {
      const email = localStorage.getItem('user_email');
      if (!email) return alert("Please log in again.");
      const formData = new FormData();
      formData.append('email', email);
      for (const [key, value] of Object.entries(this.job)) {
        formData.append(key, value);
      }
      try {
        const res = await fetch('http://localhost:8001/post_job', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          alert("Job posted successfully!");
          this.$router.push('/hr/dashboard');
        } else {
          const err = await res.json();
          alert("Error: " + err.detail || "Job posting failed.");
        }
      } catch (err) {
        alert("Error: " + err.message);
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
