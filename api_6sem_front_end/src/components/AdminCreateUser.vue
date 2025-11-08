<template>
  <div>
    <BackgroundMain />
  </div>
  <div class="UserCreate-container">
    <div class="card">
      <h2 class="title">Criar usuário</h2>

      <div class="form-group">
        <label class="label" for="username"></label>
        <input id="username" v-model="username" type="text" placeholder="Novo Usuário">
      </div>

      <div class="form-group">
        <label class="label" for="level"></label>
        <select id="level" v-model="level">
          <option value="" disabled>Nível</option>
          <option value="N1">Analista N1</option>
          <option value="N2">Analista N2</option>
          <option value="N3">Analista N3</option>
        </select>
      </div>

      <div class="form-group">
        <label class="label" for="email"></label>
        <input id="email" v-model="email" type="email" placeholder="Email"/>
      </div>

      <div class="form-group">
        <label class="label" for="password"></label>
        <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Senha de primeiro acesso"/>
        <span class="icon" @click="togglePasswordVisibility">≡</span>
      </div>

      <button class="btn-create" @click="createUser">Criar</button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const username = ref('')
const level = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}

function createUser() {
  if (!username.value || !level.value || !email.value || !password.value) {
    toast.error('Por favor, preencha todos os campos')
    return
  }

  console.log({
    username: username.value,
    level: level.value,
    email: email.value,
    password: password.value
  })

  toast.success('Usuário criado com sucesso!')

  username.value = ''
  level.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style scoped>
.UserCreate-container {
  position: absolute;
  top: 80px;
  left: 60px;
  width: 360px;
}

.card {
  background: white;
  border: 1px solid #502A81;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 19px 24px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.title {
  color: #502A81;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 18px;
  text-transform: lowercase;
}

.title::first-letter {
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 12px;
  position: relative;
}

input,
select {
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background-color: #F1E8FF;
  font-size: 14px;
  color: #502A81;
  outline: none;
  appearance: none;
  box-sizing: border-box;
}

select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23502A81' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 36px;
}

.icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #502A81;
  font-size: 16px;
  cursor: pointer;
}

.btn-create {
  width: 100%;
  background-color: #502A81;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 4px;
}

.btn-create:hover {
  background-color:  #6739b7;
}

.toast-success {
  background-color: #4CAF50 !important;
  color: white !important;
}

.toast-error {
  background-color: #f44336 !important;
  color: white !important;
}

input::placeholder,
select::placeholder {
  color: #502A81;
  opacity: 0.7;
}

</style>
