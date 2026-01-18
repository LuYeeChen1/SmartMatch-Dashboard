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
          <h2 class="text-2xl font-bold text-center mb-6">Edit Resume</h2>
          <form @submit.prevent="saveEdit" class="space-y-6">
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Introduction</label>
              <textarea v-model="form.intro" class="w-full border rounded p-2" rows="4"></textarea>
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Skills Learned</label>
              <input v-model="form.skill_learned" type="text" class="w-full border rounded p-2" />
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Education</label>
              <textarea v-model="form.education" class="w-full border rounded p-2" rows="3"></textarea>
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Experience</label>
              <textarea v-model="form.experience" class="w-full border rounded p-2" rows="3"></textarea>
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Optional Experience</label>
              <textarea v-model="form.optionalExperience" class="w-full border rounded p-2" rows="2"></textarea>
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">First Interest</label>
              <input v-model="form.firstInterest" type="text" class="w-full border rounded p-2" />
              <label class="block font-medium mt-2 mb-1">Second Interest</label>
              <input v-model="form.secondInterest" type="text" class="w-full border rounded p-2" />
              <label class="block font-medium mt-2 mb-1">Third Interest</label>
              <input v-model="form.thirdInterest" type="text" class="w-full border rounded p-2" />
            </div>
            <div class="p-4 bg-white border rounded">
              <label class="block font-medium mb-1">Other Info</label>
              <textarea v-model="form.otherInfo" class="w-full border rounded p-2" rows="3"></textarea>
            </div>
            <div class="text-center">
              <button :disabled="isLoading" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                {{ isLoading ? 'Saving...' : 'Save Resume' }}
              </button>
            </div>
          </form>
          <div v-if="error" class="mt-4 text-red-600 bg-red-50 p-3 rounded">{{ error }}</div>
          <div v-if="successMsg" class="mt-4 text-green-600 bg-green-50 p-3 rounded">{{ successMsg }}</div>
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
        intro: '',
        education: '',
        experience: '',
        optionalExperience: '',
        firstInterest: '',
        secondInterest: '',
        thirdInterest: '',
        otherInfo: '',
        skill_learned: ''
      },
      email: localStorage.getItem("user_email") || "",
      isLoading: false,
      error: '',
      successMsg: ''
    };
  },
  async mounted() {
    await this.fetchResume();
  },
  methods: {
    async fetchResume() {
      if (!this.email) return;
      try {
        const res = await fetch(`http://localhost:8001/get_portfolio?email=${encodeURIComponent(this.email)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length) {
            this.form = {
              intro: data.intro || '',
              education: data.education || '',
              experience: data.experience || '',
              optionalExperience: data.optional_experience || '',
              firstInterest: data.first_interest || '',
              secondInterest: data.second_interest || '',
              thirdInterest: data.third_interest || '',
              otherInfo: data.other_info || '',
              skill_learned: data.skill_learned || ''
            };
          }
        }
      } catch (err) {
        // Optionally handle error
      }
    },
    async saveEdit() {
      if (!this.email) return;
      this.isLoading = true;
      this.error = '';
      this.successMsg = '';
      const formData = new FormData();
      for (const key in this.form) formData.append(key, this.form[key]);
      formData.append("email", this.email);
      const url = "http://localhost:8001/portfolio";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });
        if (response.ok) {
          this.successMsg = "Resume updated successfully!";
          setTimeout(() => this.$router.push('/jobseeker/resume'), 1000);
        } else {
          throw new Error("Failed to save resume");
        }
      } catch (e) {
        this.error = "Error: " + e.message;
      } finally {
        this.isLoading = false;
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