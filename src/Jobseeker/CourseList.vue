<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Available Courses</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">Logout</button>
      </div>
    </header>
    <div class="flex flex-1">
      <aside class="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <router-link to="/jobseeker/resume" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Resume</router-link>
        <router-link to="/jobseeker/dashboard" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Job Dashboard</router-link>
        <router-link to="/jobseeker/job-recommend" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Job Recommendation</router-link>
        <router-link to="/jobseeker/application-tracking" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Track My Applications</router-link>
        <router-link to="/jobseeker/course-list" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Join Course</router-link>
      </aside>
      <main class="flex-1 p-8 bg-gray-50">
        <div class="max-w-6xl mx-auto">
          <div class="mb-6 flex gap-2">
            <input v-model="lecturerFilter" type="text" placeholder="Filter by lecturer email (optional)" class="border px-2 py-1 rounded w-64" />
            <input v-model="skillFilter" type="text" placeholder="Filter by skill (optional)" class="border px-2 py-1 rounded w-64" />
          </div>
          <div v-if="filteredCourses.length === 0" class="text-gray-500 text-center">No courses found.</div>
          <div v-else class="space-y-6">
            <div v-for="course in filteredCourses" :key="course.id" class="p-6 border rounded shadow-sm bg-white">
              <div class="flex justify-between items-center mb-2">
                <div>
                  <h3 class="text-xl font-semibold">{{ course.title }}</h3>
                  <p class="text-sm text-gray-600">Lecturer: {{ course.lecturer_email }}</p>
                  <p class="text-xs text-gray-500">Time: {{ course.time }}</p>
                </div>
              </div>
              <p class="text-sm text-gray-700 mb-2 line-clamp-3">{{ course.description }}</p>
              <div class="text-sm text-gray-500 mt-2">Created at {{ formatDate(course.created_at) }}</div>
              <button
                :disabled="joinedCourseIds.includes(course.id)"
                @click="joinCourse(course.id)"
                :class="['mt-4 px-4 py-2 rounded font-semibold', joinedCourseIds.includes(course.id) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700']"
              >
                {{ joinedCourseIds.includes(course.id) ? 'Joined' : 'Join Course' }}
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
      courses: [],
      lecturerFilter: '',
      skillFilter: '',
      joinedCourseIds: [],
    };
  },
  computed: {
    filteredCourses() {
      let filtered = this.courses;
      if (this.lecturerFilter) {
        const lf = this.lecturerFilter.toLowerCase();
        filtered = filtered.filter(c => (c.lecturer_email || '').toLowerCase().includes(lf));
      }
      if (this.skillFilter) {
        const sf = this.skillFilter.toLowerCase();
        filtered = filtered.filter(c =>
          (c.title && c.title.toLowerCase().includes(sf)) ||
          (c.description && c.description.toLowerCase().includes(sf))
        );
      }
      return filtered;
    }
  },
  async mounted() {
    const res = await fetch('http://localhost:8001/courses');
    const data = await res.json();
    this.courses = data.courses || [];
    // Fetch joined courses
    const userEmail = localStorage.getItem('user_email');
    if (userEmail) {
      const res2 = await fetch(`http://localhost:8001/course_enrollments?user_email=${encodeURIComponent(userEmail)}`);
      const data2 = await res2.json();
      this.joinedCourseIds = data2.joined_courses || [];
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleDateString();
    },
    async joinCourse(courseId) {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) {
        alert('Please log in first.');
        return;
      }
      const res = await fetch('http://localhost:8001/join_course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseId, user_email: userEmail }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Course application submitted!');
        this.joinedCourseIds.push(courseId); // Add to joined list
      } else {
        alert(data.detail || 'Failed to join course.');
      }
    },
    logout() {
      localStorage.removeItem('full_name');
      localStorage.removeItem('user_role');
      localStorage.removeItem('email');
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style> 