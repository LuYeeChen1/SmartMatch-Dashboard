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
        <div class="max-w-4xl mx-auto">
          <!-- Access Denied -->
          <div v-if="userRole !== 'human_resource'" class="text-center bg-white p-8 rounded shadow">
            <h2 class="text-xl font-semibold text-red-600 mb-2">Access Denied</h2>
            <p class="text-gray-600 mb-4">Only Human Resource users can post jobs.</p>
            <button @click="goToLogin" class="text-blue-600 hover:underline">← Back to Login</button>
          </div>

          <!-- Job Posting Form -->
          <div v-else>
            <div class="bg-white p-8 rounded shadow">
              <h1 class="text-2xl font-bold mb-6 text-center">Post a New Job</h1>

              <form @submit.prevent="submitJob" class="space-y-6">
                <!-- Company Info -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Company Name *</label>
                    <input v-model="companyName" type="text" required class="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Contact Number *</label>
                    <input v-model="contactNumber" type="tel" required class="w-full border px-3 py-2 rounded" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Company Description *</label>
                  <textarea v-model="companyDescription" rows="3" required class="w-full border px-3 py-2 rounded"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Company Website (optional)</label>
                  <input v-model="companyLink" type="url" class="w-full border px-3 py-2 rounded" />
                </div>

                <!-- Job Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-1">Job Title *</label>
                    <input v-model="jobTitle" type="text" required class="w-full border px-3 py-2 rounded" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1">Country *</label>
                    <input v-model="country" type="text" required class="w-full border px-3 py-2 rounded" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Location *</label>
                  <input v-model="location" type="text" required class="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">Job Description *</label>
                  <textarea v-model="jobDescription" rows="4" required class="w-full border px-3 py-2 rounded"></textarea>
                </div>

                <!-- Skills -->
                <div>
                  <label class="block text-sm font-medium mb-1">Required Skills *</label>
                  <div v-for="(skill, i) in skills" :key="i" class="flex items-center gap-2 mb-2">
                    <input v-model="skills[i]" type="text" required class="flex-1 border px-3 py-2 rounded" />
                    <button type="button" @click="removeSkill(i)" :disabled="skills.length === 1" class="text-red-500 text-sm">Remove</button>
                  </div>
                  <button type="button" @click="addSkill" class="text-blue-600 text-sm hover:underline">+ Add Skill</button>
                </div>

                <!-- Education -->
                <div>
                  <label class="block text-sm font-medium mb-1">Education Requirements *</label>
                  <div v-for="(edu, i) in education" :key="i" class="flex items-center gap-2 mb-2">
                    <input v-model="education[i]" type="text" required class="flex-1 border px-3 py-2 rounded" />
                    <button type="button" @click="removeEducation(i)" :disabled="education.length === 1" class="text-red-500 text-sm">Remove</button>
                  </div>
                  <button type="button" @click="addEducation" class="text-blue-600 text-sm hover:underline">+ Add Education</button>
                </div>

                <!-- Additional Info -->
                <div>
                  <label class="block text-sm font-medium mb-1">Additional Info (optional)</label>
                  <textarea v-model="other" rows="3" class="w-full border px-3 py-2 rounded"></textarea>
                </div>

                <!-- Submit -->
                <div class="text-center">
                  <button :disabled="isLoading" type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                    {{ isLoading ? 'Posting...' : 'Post Job' }}
                  </button>
                </div>
              </form>
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
      email: '',
      userRole: '',
      companyName: '',
      companyDescription: '',
      jobTitle: '',
      jobDescription: '',
      skills: [''],
      education: [''],
      location: '',
      country: '',
      contactNumber: '',
      companyLink: null,
      other: '',
      isLoading: false,
      fullName: localStorage.getItem('full_name') || ''
    };
  },
  mounted() {
    this.email = localStorage.getItem("user_email") || '';
    this.userRole = localStorage.getItem("user_role") || '';
  },
  methods: {
    addSkill() {
      this.skills.push('');
    },
    removeSkill(index) {
      if (this.skills.length > 1) this.skills.splice(index, 1);
    },
    addEducation() {
      this.education.push('');
    },
    removeEducation(index) {
      if (this.education.length > 1) this.education.splice(index, 1);
    },
    async submitJob() {
      if (!this.email) return alert("Please log in again.");

      this.isLoading = true;
      const formData = new FormData();
      formData.append('email', this.email);
      formData.append('company_name', this.companyName.trim());
      formData.append('company_description', this.companyDescription.trim());
      formData.append('job_title', this.jobTitle.trim());
      formData.append('job_description', this.jobDescription.trim());
      formData.append('skills_required', this.skills.join(', '));
      formData.append('education_required', this.education.join(', '));
      formData.append('location', this.location.trim());
      formData.append('country', this.country.trim());
      formData.append('contact_number', this.contactNumber.trim());
      if (this.companyLink) formData.append('company_link', this.companyLink.trim());
      if (this.other) formData.append('other', this.other.trim());

      try {
        const response = await fetch("http://localhost:8001/post_job", {
          method: "POST",
          body: formData
        });
        const result = await response.json();
        if (!response.ok) {
          alert(result.detail || "Job posting failed.");
        } else {
          alert("Job posted successfully!");
          this.$router.push("/hr/dashboard");
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        this.isLoading = false;
      }
    },
    goToLogin() {
      this.$router.push("/");
    },
    logout() {
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      this.$router.push('/');
    }
  }
};
</script>
