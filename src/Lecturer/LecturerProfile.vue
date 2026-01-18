<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-blue-700 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Lecturer Profile</h1>
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
          <h2 class="text-2xl font-bold mb-6">Lecturer Profile</h2>
          <div v-if="loading" class="text-gray-500">Loading profile...</div>
          <div v-else-if="profileFetched" class="bg-gray-50 p-4 rounded shadow-inner">
            <h3 class="font-semibold mb-2 text-lg">Lecturer Information</h3>
            <div class="mb-2 flex items-center">
              <span class="font-medium mr-2">Full Name:</span>
              <span v-if="!editMode">{{ full_name }}</span>
              <input v-else v-model="editFullName" class="border rounded px-2 py-1 text-sm" />
            </div>
            <div class="mb-2"><span class="font-medium">Email:</span> {{ email }}</div>
            <div class="flex space-x-2 mt-4">
              <button v-if="!editMode" @click="editMode = true; editFullName = full_name" class="btn-primary px-4 py-1 text-sm">Edit</button>
              <template v-else>
                <button @click="saveEdit" class="btn-success px-4 py-1 text-sm" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
                <button @click="cancelEdit" class="btn-secondary px-4 py-1 text-sm">Cancel</button>
              </template>
            </div>
          </div>
          <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
          <div v-if="successMsg" class="mt-4 text-green-600">{{ successMsg }}</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      full_name: '',
      email: localStorage.getItem('user_email') || '',
      error: '',
      profileFetched: false,
      loading: true,
      editMode: false,
      editFullName: '',
      saving: false,
      successMsg: ''
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      this.error = '';
      this.loading = true;
      try {
        const res = await fetch(`http://localhost:8001/user?email=${this.email}`);
        const data = await res.json();
        if (res.ok && data.success && data.full_name) {
          this.full_name = data.full_name;
          this.profileFetched = true;
        } else {
          this.error = 'Profile not found.';
        }
      } catch (err) {
        this.error = 'Failed to fetch profile.';
      } finally {
        this.loading = false;
      }
    },
    cancelEdit() {
      this.editMode = false;
      this.editFullName = this.full_name;
      this.successMsg = '';
      this.error = '';
    },
    async saveEdit() {
      this.saving = true;
      this.error = '';
      this.successMsg = '';
      try {
        const res = await fetch('http://localhost:8001/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, full_name: this.editFullName })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          this.full_name = this.editFullName;
          this.editMode = false;
          this.successMsg = 'Profile updated successfully!';
        } else {
          this.error = data.detail || 'Failed to update profile.';
        }
      } catch (err) {
        this.error = 'Failed to update profile.';
      } finally {
        this.saving = false;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/');
    }
  }
};
</script> 