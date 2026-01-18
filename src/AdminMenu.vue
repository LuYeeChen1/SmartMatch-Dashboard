<template>
  <nav class="w-64 bg-white shadow h-full flex flex-col">
    <div class="p-4 font-bold text-lg border-b">Admin</div>
    <ul class="flex-1 p-4 space-y-2">
      <li><router-link to="/admin/dashboard" class="block px-3 py-2 rounded hover:bg-blue-100">Dashboard</router-link></li>
      <li><router-link to="/admin/users" class="block px-3 py-2 rounded hover:bg-blue-100">User Management</router-link></li>
      <li><router-link to="/admin/analytics" class="block px-3 py-2 rounded hover:bg-blue-100">System Analytics</router-link></li>
      <li><router-link to="/admin/settings" class="block px-3 py-2 rounded hover:bg-blue-100">Settings</router-link></li>
    </ul>
    <div class="p-4 border-t">
      <router-link to="/profile" class="block px-3 py-2 rounded hover:bg-blue-100">Profile</router-link>
      <router-link to="/logout" class="block px-3 py-2 rounded hover:bg-red-100 text-red-600">Logout</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminMenu',
};
</script>

<style scoped>
</style> 