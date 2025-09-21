<template>
  <button v-if="authContext?.authStatus.isAuthenticated" @click="handleLogOut"
    class=" bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
    Logout
  </button>
</template>

<script setup lang="ts">
import { logOut } from '@/lib/auth';
import { AUTH_CONTEXT_KEY } from '@/lib/keys';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const authContext = inject(AUTH_CONTEXT_KEY)
const router = useRouter()
const handleLogOut = () => {
  logOut()
  router.push({
    name: 'Login',
  })
}

</script>