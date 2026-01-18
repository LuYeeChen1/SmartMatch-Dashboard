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
        <div>
          <div class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
            <!-- Header Section -->
            <div class="max-w-4xl mx-auto mb-8">
              <div class="glass-card p-8 rounded-2xl border border-white/20 text-center">
                <h2 class="text-4xl font-bold gradient-text mb-2">AI Job Recommendation System</h2>
                <p class="text-gray-600">Get personalized job recommendations based on your skills and portfolio</p>
              </div>
            </div>

            <!-- Recommendation Options -->
            <div class="max-w-4xl mx-auto mb-8">
              <div class="glass-card p-8 rounded-2xl border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Portfolio-based -->
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 class="text-xl font-semibold mb-4">Portfolio-based Recommendations</h3>
                  <p class="text-gray-600 mb-4">Get jobs based on your submitted portfolio</p>
                  <button @click="getPortfolioRecommendations" :disabled="isLoading" class="btn-success w-full">
                    <span v-if="isLoading">Loading...</span>
                    <span v-else>Get Portfolio Recommendations</span>
                  </button>
                </div>

                <!-- Manual-based -->
                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <h3 class="text-xl font-semibold mb-4">Manual Input Recommendations</h3>
                  <p class="text-gray-600 mb-4">Enter your preferences manually</p>
                  <button @click="showManualForm = true" class="btn-primary w-full">Enter Preferences</button>
                </div>
              </div>
            </div>

            <!-- Manual Input Form -->
            <div v-if="showManualForm" class="max-w-2xl mx-auto mb-8">
              <div class="glass-card p-8 rounded-2xl border border-white/20">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">Enter Your Preferences</h3>
                <div class="space-y-4">
                  <input v-model="jobTitle" placeholder="Job Title" class="input-field w-full" />
                  <input v-model="skills" placeholder="Skills (comma-separated)" class="input-field w-full" />
                  <input v-model="education" placeholder="Education" class="input-field w-full" />
                  <div class="flex space-x-4">
                    <button @click="getRecommendations" :disabled="isLoading" class="btn-success flex-1">
                      <span v-if="isLoading">Loading...</span>
                      <span v-else>Get Recommendations</span>
                    </button>
                    <button @click="showManualForm = false" class="btn-secondary flex-1">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recommendations Table -->
            <div class="max-w-6xl mx-auto" v-if="recommendations !== null">
              <div class="glass-card p-8 rounded-2xl border border-white/20">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-3xl font-bold gradient-text">Job Recommendations</h2>
                  <button class="btn-primary" @click="downloadPDF">Download PDF</button>
                </div>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Skills</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Similarity</th>
                        <th class="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="recommendations.length === 0">
                        <td colspan="6" class="text-center py-6 text-gray-400 font-semibold">No recommendations found.</td>
                      </tr>
                      <tr 
                        v-for="(rec, index) in recommendations.slice(0, 10)" 
                        :key="index"
                        :class="{ 'bg-green-50': rec.similarity_score >= 0.8 }"
                      >
                        <td class="px-4 py-2 font-semibold">{{ rec.job_title }}
                          <div class="text-xs text-gray-500 mt-1">Posted by: <span class="font-semibold">{{ rec.email }}</span></div>
                          <div class="text-xs text-gray-500 mt-1">Your Email: <span class="font-semibold">{{ email }}</span></div>
                        </td>
                        <td class="px-4 py-2">{{ rec.company_name }}</td>
                        <td class="px-4 py-2">{{ rec.location }}, {{ rec.country }}</td>
                        <td class="px-4 py-2">{{ rec.skills_required }}</td>
                        <td class="px-4 py-2">{{ (rec.similarity_score * 100).toFixed(2) }}%</td>
                        <td class="px-4 py-2">
                          <button class="btn-primary" @click="applyJob(rec)">Apply</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Course Recommendations Section -->
            <div class="max-w-6xl mx-auto mt-8" v-if="courseRecommendations.length > 0">
              <div class="glass-card p-8 rounded-2xl border border-white/20">
                <h2 class="text-3xl font-bold gradient-text mb-6">Course Recommendations</h2>
                <p class="text-gray-600 mb-4">Based on your skill gaps, here are courses to help you qualify for these jobs:</p>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Course Title</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Similarity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(course, idx) in courseRecommendations" :key="course.skill">
                        <td class="px-4 py-2 font-semibold">#{{ idx + 1 }}</td>
                        <td class="px-4 py-2">{{ course.course_title }}</td>
                        <td class="px-4 py-2">{{ course.course_description }}</td>
                        <td class="px-4 py-2">{{ course.duration }}</td>
                        <td class="px-4 py-2">{{ course.difficulty }}</td>
                        <td class="px-4 py-2">{{ (course.similarity_score * 100).toFixed(2) }}%</td>
                      </tr>
                    </tbody>
                  </table>
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
  name: "JobRecommend",
  data() {
    return {
      jobTitle: '',
      skills: '',
      education: '',
      recommendations: null,
      courseRecommendations: [],
      showManualForm: false,
      isLoading: false,
      email: localStorage.getItem("user_email") || ""
    };
  },
  mounted() {
    if (localStorage.getItem("triggerPortfolioRecommend") === "1") {
      localStorage.removeItem("triggerPortfolioRecommend");
      this.getPortfolioRecommendations();
    }
  },
  methods: {
    async getRecommendations() {
      if (!this.jobTitle && !this.skills && !this.education) {
        return this.showError("Please fill in at least one field.");
      }
      this.isLoading = true;
      try {
        const res = await fetch("http://localhost:8001/jobRecommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_title: this.jobTitle,
            skills: this.skills,
            education: this.education
          })
        });
        const result = await res.json();
        this.recommendations = result.recommendations.sort((a, b) => b.similarity_score - a.similarity_score);
        this.showManualForm = false;
        // Get course recommendations after job recommendations
        await this.getCourseRecommendations();
      } catch (e) {
        this.showError("Error retrieving recommendations.");
      } finally {
        this.isLoading = false;
      }
    },
    async getPortfolioRecommendations() {
      this.isLoading = true;
      try {
        // 1. Fetch portfolio
        const portfolioRes = await fetch(`http://localhost:8001/portfolio?email=${encodeURIComponent(this.email)}`);
        const portfolioData = await portfolioRes.json();
        if (!portfolioData.success || !portfolioData.portfolio) {
          this.showError("No portfolio found. Please complete your portfolio first.");
          this.isLoading = false;
          return;
        }
        const portfolio = portfolioData.portfolio;
        // 2. Extract fields
        const skills = portfolio.skill_learned || '';
        const education = portfolio.education || '';
        const job_title = portfolio.first_interest || '';
        // 3. Send to /jobRecommend
        const res = await fetch("http://localhost:8001/jobRecommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job_title, skills, education })
        });
        const result = await res.json();
        this.recommendations = result.recommendations?.sort((a, b) => b.similarity_score - a.similarity_score) || [];
        // Get course recommendations after job recommendations
        await this.getCourseRecommendations();
      } catch (e) {
        this.showError("Portfolio recommendation failed.");
      } finally {
        this.isLoading = false;
      }
    },
    async applyJob(rec) {
      try {
        let hrEmail = rec.email;
        // If HR email is missing, fetch it from the backend using job_title and company_name
        if (!hrEmail) {
          const res = await fetch(`http://localhost:8001/jobDashboardData`);
          const jobs = await res.json();
          const match = jobs.find(j => j.job_title === rec.job_title && j.company_name === rec.company_name);
          hrEmail = match ? match.email : '';
        }
        if (!hrEmail) {
          this.showError('HR email not found for this job. Cannot apply.');
          return;
        }
        const formData = new FormData();
        formData.append("jobseeker_email", this.email);
        formData.append("hr_email", hrEmail);
        formData.append("job_title", rec.job_title);
        formData.append("company_name", rec.company_name);
        const res = await fetch("http://localhost:8001/apply_job", {
          method: "POST",
          body: formData
        });
        const result = await res.json();
        if (result.success) {
          this.showSuccess("Applied successfully!");
        } else if (result.redirect === 'portfolio') {
          this.showError("Please complete your portfolio. Redirecting...");
          setTimeout(() => this.$router.push('/Jobseeker/portfolio'), 1500);
        } else {
          this.showError("Application failed.");
        }
      } catch (e) {
        this.showError("Error applying for job.");
      }
    },
    async getCourseRecommendations() {
      if (!this.recommendations || this.recommendations.length === 0) return;
      
      try {
        // Get user's skills from portfolio
        const portfolioRes = await fetch(`http://localhost:8001/portfolio?email=${encodeURIComponent(this.email)}`);
        const portfolioData = await portfolioRes.json();
        const userSkills = portfolioData.success ? (portfolioData.portfolio.skill_learned || '') : '';
        
        // Get job skills from recommendations
        const jobSkills = this.recommendations.map(rec => rec.skills_required).join(',');
        
        // Get course recommendations
        const res = await fetch("http://localhost:8001/courseRecommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            job_skills: jobSkills,
            user_skills: userSkills
          })
        });
        const result = await res.json();
        // Sort by similarity_score if available, otherwise keep as is
        this.courseRecommendations = (result.course_recommendations || []).sort((a, b) => (b.similarity_score || 0) - (a.similarity_score || 0));
      } catch (e) {
        console.error("Course recommendation failed:", e);
      }
    },
    downloadPDF() {
      if (!this.email) return;
      window.open(`http://localhost:8001/generate_pdf?email=${this.email}`, '_blank');
    },
    goBackToMenu() {
      this.$router.push("/JobSeekerMenu");
    },
    showSuccess(msg) {
      alert(msg); // Replace with toast if needed
    },
    showError(msg) {
      alert(msg); // Replace with toast if needed
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
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.input-field {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background 0.3s;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-success {
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #111827;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
</style>
