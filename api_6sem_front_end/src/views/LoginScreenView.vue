<template>
  <div>
    <LoginScreen @login="handleLogin" />
    <DetailsUser 
        :userName="nameUser"
        :userEmail="emailUser"
        :userRole="roleUser"
    />
  </div>
</template>

<script setup>
import axios from 'axios'
import LoginScreen from '@/components/LoginScreen.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import { useToast } from 'vue-toastification'
import DetailsUser from '@/components/DetailsUser.vue'
import { ref } from 'vue'

const userStore = useUserStore();
const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const nameUser = ref("")
const emailUser = ref("")
const roleUser = ref("")

async function handleLogin({ username, password }) {
  try {
    const response = await axios.post("http://localhost:8000/login/validate-login", { username, password })

    if (!response.data.token) {
      toast.error("Usuário ou senha incorretos!")
      return
    }

    auth.setToken(response.data.token)

    userStore.setUser({
        name: response.data.name,
        email: response.data.username,
        role: response.data.role
    });

    switch (response.data.role) {
        case 'N1': router.push('/analystn1'); break
        case 'N2': router.push('/analystn2'); break
        case 'N3': router.push('/analystn3'); break
        case 'Gestor': router.push('/gestor'); break
        case 'Administrador': router.push('/adm'); break
    }

  } catch (error) {
    console.error("Erro no login:", error)
    toast.error("Erro ao tentar logar!")
  }
}
</script>