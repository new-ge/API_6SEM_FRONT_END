import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    role: ''
  }),
  actions: {
    setToken(token) {
      if (!token || typeof token !== 'string') {
        console.error('Token inválido:', token)
        return
      }
      this.token = token
      const decoded = jwtDecode(token)
      this.role = decoded.role
      console.log('Token definido:', token)
      console.log('Role decodificado:', this.role)
    }
  }
})
