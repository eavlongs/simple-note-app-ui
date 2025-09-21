import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditNoteForm from './components/notes/EditNoteForm.vue'
import LoginForm from './components/auth/LoginForm.vue'
import NewNoteForm from './components/notes/NewNoteForm.vue'
import NoteApp from './components/notes/NoteApp.vue'
import NoteDetail from './components/notes/NoteDetail.vue'
import NotFound from './components/general/NotFound.vue'
import RegistrationForm from './components/auth/RegistrationForm.vue'
import { checkAuthenticationStatus } from './lib/auth'
import { AUTH_CONTEXT_KEY } from './lib/keys'
import { setAuthStatus } from './authStore'

const routes = [
  {
    path: '/',
    name: 'NoteApp',
    component: NoteApp,
    meta: {
      requiresAuth: true,
    },
    alias: '/notes',
  },
  {
    path: '/notes/new',
    name: 'NewNote',
    component: NewNoteForm,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notes/:id',
    name: 'NoteDetail',
    component: NoteDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/notes/:id/edit',
    name: 'EditNote',
    component: EditNoteForm,
    meta: {
      requiresAuth: true,
    },
  },

  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/register', name: 'Register', component: RegistrationForm },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const authStatus = await checkAuthenticationStatus()
  setAuthStatus(authStatus)

  const isAuthenticated = authStatus.isAuthenticated

  if (isAuthenticated && ['Login', 'Register'].includes(to.name as string)) {
    return { name: 'NoteApp' }
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login' }
  }
})

export default router
