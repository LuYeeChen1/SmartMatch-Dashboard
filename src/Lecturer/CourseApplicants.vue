<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Lecturer Dashboard</h1>
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
        <h1 class="text-2xl font-bold mb-4">Course Applicants</h1>
        <div v-for="course in courses" :key="course.id" class="mb-6">
          <h2 class="text-lg font-semibold mb-2">{{ course.title }}</h2>
          <table class="min-w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr>
                <th class="px-4 py-2 border-b text-left">Applicant</th>
                <th class="px-4 py-2 border-b text-left">Status</th>
                <th class="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in course.applicants" :key="app.id">
                <td class="px-4 py-2 border-b">{{ app.user_email }}</td>
                <td class="px-4 py-2 border-b">{{ app.status }}</td>
                <td class="px-4 py-2 border-b">
                  <button
                    v-if="app.status === 'pending'"
                    @click="decide(app.id, 'accepted')"
                    class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                  >Accept</button>
                  <button
                    v-if="app.status === 'pending'"
                    @click="decide(app.id, 'rejected')"
                    class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >Reject</button>
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
    };
  },
  async mounted() {
    const lecturerEmail = localStorage.getItem('user_email');
    const res = await fetch(`http://localhost:8001/course_enrollments?lecturer_email=${encodeURIComponent(lecturerEmail)}`);
    const data = await res.json();
    this.courses = data.courses || [];
  },
  methods: {
    async decide(enrollmentId, status) {
      const res = await fetch('http://localhost:8001/course_enrollment_decision', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollment_id: enrollmentId, status }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Decision updated!');
        window.location.reload();
      } else {
        alert(data.detail || 'Failed to update decision.');
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  },
};
</script> 