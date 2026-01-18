<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Course List</h1>
        <button @click="logout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">Logout</button>
      </div>
    </header>
    <div class="flex flex-1">
      <aside class="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
        <router-link to="/lecturer/profile" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Profile</router-link>
        <router-link to="/lecturer/create-course" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Create Course</router-link>
        <router-link to="/lecturer/course-list" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Course List</router-link>
        <router-link to="/lecturer/course-fees" class="block py-2 px-4 rounded hover:bg-blue-100" active-class="bg-blue-200 font-bold">Course Fees</router-link>
      </aside>
      <main class="flex-1 p-8 bg-gray-50">
        <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
          <h2 class="text-2xl font-bold mb-6">Courses</h2>
          <div class="mb-4">
            <input v-model="lecturer_email" type="email" placeholder="Filter by lecturer email (optional)" class="border rounded px-3 py-2 w-full" />
            <button @click="fetchCourses" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Fetch Courses</button>
          </div>
          <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
          <div v-if="message" class="text-green-600 mb-4">{{ message }}</div>
          <div v-if="courses.length === 0" class="text-gray-500">No courses found.</div>
          <table v-else class="w-full border mt-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 text-left">Title</th>
                <th class="py-2 px-4 text-left">Description</th>
                <th class="py-2 px-4 text-left">Lecturer</th>
                <th class="py-2 px-4 text-left">Time</th>
                <th class="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="course in courses" :key="course.id" class="border-b">
                <td class="py-2 px-4 font-semibold">{{ course.title }}</td>
                <td class="py-2 px-4">{{ course.description }}</td>
                <td class="py-2 px-4">{{ course.lecturer_email }}</td>
                <td class="py-2 px-4">{{ course.time }}</td>
                <td class="py-2 px-4 flex gap-2">
                  <router-link :to="`/lecturer/edit-course/${course.id}`" class="text-blue-600 hover:underline text-sm">Edit</router-link>
                  <button @click="deleteCourse(course.id)" class="text-red-600 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
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
      lecturer_email: localStorage.getItem('user_email') || '',
      error: "",
      message: ""
    };
  },
  methods: {
    async fetchCourses() {
      this.error = "";
      this.message = "";
      let url = "http://localhost:8001/courses";
      if (this.lecturer_email) {
        url += `?lecturer_email=${encodeURIComponent(this.lecturer_email)}`;
      }
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.success) {
          this.courses = data.courses;
        } else {
          this.error = data.detail || data.message || "Failed to fetch courses.";
        }
      } catch (err) {
        this.error = "Network error.";
      }
    },
    async deleteCourse(courseId) {
      this.error = "";
      this.message = "";
      if (!confirm("Are you sure you want to delete this course?")) return;
      try {
        const res = await fetch(`http://localhost:8001/delete_course?course_id=${courseId}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (res.ok && data.success) {
          this.message = data.message || "Course deleted.";
          this.fetchCourses();
        } else {
          this.error = data.detail || data.message || "Failed to delete course.";
        }
      } catch (err) {
        this.error = "Network error.";
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchCourses();
  }
};
</script> 