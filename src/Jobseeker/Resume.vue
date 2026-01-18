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
          <h2 class="text-2xl font-bold mb-6 text-center">Resume</h2>
          <div v-if="loading" class="text-gray-500 text-center py-8">Loading resume...</div>
          <div v-else-if="!resumeFetched" class="bg-gray-50 rounded shadow-inner p-6 text-center">
            <p class="text-gray-600 mb-4">No resume found. Click below to create your resume.</p>
            <router-link to="/jobseeker/edit-resume" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Create Resume
            </router-link>
          </div>
          <div v-else class="">
            <div class="bg-gray-50 rounded-lg shadow-inner p-6 mb-6">
              <h3 class="font-semibold mb-2 text-lg">Resume Information</h3>
              <div class="mb-2"><span class="font-medium">Email:</span> {{ form.email }}</div>
              <div v-if="form.intro" class="mb-2"><span class="font-medium">Introduction:</span> {{ form.intro }}</div>
              <div v-if="form.education" class="mb-2"><span class="font-medium">Education:</span> {{ form.education }}</div>
              <div v-if="form.experience" class="mb-2"><span class="font-medium">Experience:</span> {{ form.experience }}</div>
              <div v-if="form.optional_experience" class="mb-2"><span class="font-medium">Optional Experience:</span> {{ form.optional_experience }}</div>
              <div v-if="form.first_interest || form.second_interest || form.third_interest" class="mb-2">
                <span class="font-medium">Interests:</span>
                <span v-if="form.first_interest"> {{ form.first_interest }}</span>
                <span v-if="form.second_interest">, {{ form.second_interest }}</span>
                <span v-if="form.third_interest">, {{ form.third_interest }}</span>
              </div>
              <div v-if="form.other_info" class="mb-2"><span class="font-medium">Other Information:</span> {{ form.other_info }}</div>
              <div v-if="form.skill_learned" class="mb-2"><span class="font-medium">Skills Learned:</span> {{ form.skill_learned }}</div>
              <div v-if="form.submitted_at" class="mb-2"><span class="font-medium">Last Updated:</span> {{ form.submitted_at }}</div>
            </div>
            <div class="text-center mt-4">
              <router-link to="/jobseeker/edit-resume" class="px-6 py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition">
                Edit
              </router-link>
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
      form: {
        email: '',
        intro: '',
        education: '',
        experience: '',
        optional_experience: '',
        first_interest: '',
        second_interest: '',
        third_interest: '',
        other_info: '',
        skill_learned: '',
        submitted_at: ''
      },
      email: localStorage.getItem("user_email") || "",
      loading: true,
      resumeFetched: false
    };
  },
  async mounted() {
    await this.fetchResume();
  },
  methods: {
    async fetchResume() {
      if (!this.email) return;
      this.loading = true;
      try {
        const res = await fetch(`http://localhost:8001/get_portfolio?email=${encodeURIComponent(this.email)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && data.portfolio) {
            this.form = {
              email: data.portfolio.email || '',
              intro: data.portfolio.intro || '',
              education: data.portfolio.education || '',
              experience: data.portfolio.experience || '',
              optional_experience: data.portfolio.optional_experience || '',
              first_interest: data.portfolio.first_interest || '',
              second_interest: data.portfolio.second_interest || '',
              third_interest: data.portfolio.third_interest || '',
              other_info: data.portfolio.other_info || '',
              skill_learned: data.portfolio.skill_learned || '',
              submitted_at: data.portfolio.submitted_at || ''
            };
            this.resumeFetched = true;
          }
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        this.loading = false;
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
body {
  font-family: sans-serif;
}
</style>
