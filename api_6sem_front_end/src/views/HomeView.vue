<template>
  <div class="home-container">
    <h1>Bem-vindo</h1>

    <button class="btn-resultados" @click="goToRole('N1')">Analista N1</button>
    <button class="btn-resultados" @click="goToRole('N2')">Analista N2</button>
    <button class="btn-resultados" @click="goToRole('N3')">Analista N3</button>
    <button class="btn-resultados" @click="goToRole('Gestor')">Gestor</button>
    <button class="btn-resultados" @click="goToRole('ADMIN')">Administrador</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { simulateLogin } from '@/services/authService'

const router = useRouter()
const auth = useAuthStore()

async function goToRole(role) {
  const token = await simulateLogin(role)
  auth.setToken(token)

  switch (role) {
    case 'N1': router.push('/analystn1'); break
    case 'N2': router.push('/analystn2'); break
    case 'N3': router.push('/analystn3'); break
    case 'Gestor': router.push('/gestor'); break
    case 'ADMIN': router.push('/adm'); break
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  gap: 10px;
}

.btn-resultados {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #502A81;
  color: white;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  width: 150px;
}

.btn-resultados:hover {
  background-color: #9565D2;
}
</style>
