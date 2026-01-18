<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Edit Course</h1>
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
        <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
          <h2 class="text-2xl font-bold mb-6">Edit Course</h2>
          <form v-if="loaded" @submit.prevent="submitEdit">
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Course Title</label>
              <input v-model="title" type="text" class="w-full border rounded px-3 py-2" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Description</label>
              <textarea v-model="description" class="w-full border rounded px-3 py-2" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Time</label>
              <input v-model="time" type="text" class="w-full border rounded px-3 py-2" />
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-semibold">Lecturer Email</label>
              <input v-model="lecturer_email" type="email" class="w-full border rounded px-3 py-2 bg-gray-100" readonly required />
            </div>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Course</button>
            <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
            <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
          </form>
          <div v-else class="text-gray-500">Loading...</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course_id: null,
      title: "",
      description: "",
      time: "",
      lecturer_email: localStorage.getItem('user_email') || '',
      message: "",
      error: "",
      loaded: false
    };
  },
  methods: {
    async fetchCourse() {
      this.error = "";
      try {
        const res = await fetch(`http://localhost:8001/courses`);
        const data = await res.json();
        if (res.ok && data.success) {
          const course = data.courses.find(c => c.id == this.course_id);
          if (course) {
            this.title = course.title;
            this.description = course.description;
            this.time = course.time;
            // Always use localStorage for lecturer_email
            this.loaded = true;
          } else {
            this.error = "Course not found.";
          }
        } else {
          this.error = data.detail || data.message || "Failed to fetch course.";
        }
      } catch (err) {
        this.error = "Network error.";
      }
    },
    async submitEdit() {
      this.message = "";
      this.error = "";
      try {
        const formData = new FormData();
        formData.append("course_id", this.course_id);
        formData.append("lecturer_email", this.lecturer_email);
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("time", this.time);

        const response = await fetch("http://localhost:8001/edit_course", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        if (response.ok && data.success) {
          this.message = data.message;
        } else {
          this.error = data.detail || data.message || "Failed to update course.";
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
    this.course_id = this.$route.params.id;
    this.fetchCourse();
  }
};
</script> 