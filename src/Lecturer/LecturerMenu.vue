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
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LecturerMenu',
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style> 