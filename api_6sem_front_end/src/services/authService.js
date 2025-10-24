import axios from 'axios'

export async function simulateLogin(role) {
  const response = await axios.post('http://localhost:8000/login/simulate-login', { role })
  return response.data.token
}
