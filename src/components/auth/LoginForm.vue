<template>
  <Layout>
    <CenterScreen>
      <div class="w-full max-w-sm p-4 lg:p-0">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <input v-model="username" type="text" placeholder="Username" required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <div>
            <input v-model="password" type="password" placeholder="Password" required
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>

          <p class="text-sm text-gray-600">
            Don't have an account? <RouterLink :to="{ name: 'Register' }">
              <span class="text-blue-500 hover:underline">Register</span>
            </RouterLink>
          </p>

          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Login
          </button>

          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>
        </form>
      </div>
    </CenterScreen>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '../Layout.vue'
import CenterScreen from '../general/CenterScreen.vue'
import { api } from '@/lib/axios'
import { saveSession } from '@/lib/auth'
import { useRouter } from 'vue-router'
import type { LoginResponse } from '@/types/auth'

const username = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const handleSubmit = async () => {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }

  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      username: username.value,
      password: password.value,
    })

    if (response.data.success && response.data.data) {
      const { accessToken, refreshToken } = response.data.data
      saveSession(accessToken, refreshToken)
      router.push({ name: 'NoteApp' })
    }

    throw new Error("Something went wrong")
  } catch (e: any) {
    error.value = e.message
  }
}
</script>