<template>
  <div>
    <BackgroundMain />
  </div>
  <div class="UserCreate-container">
    <div class="card">
      <h2 class="title">Criar usuário</h2>

      <div class="form-group">
        <label class="label" for="username"></label>
        <input id="username" v-model="username" type="text" placeholder="Usuário">
      </div>

      <div class="form-group">
        <label class="label" for="level"></label>
        <select id="level" v-model="level">
          <option value="" disabled>Nível</option>
          <option value="N1">Analista N1</option>
          <option value="N2">Analista N2</option>
          <option value="N3">Analista N3</option>
          <option value="Gestor">Gestor</option>
        </select>
      </div>

      <div class="form-group">
        <label class="label" for="email"></label>
        <input id="email" v-model="email" type="email" placeholder="Email"/>
      </div>

      <div class="form-group">
        <label class="label" for="password"></label>
        <input id="password" v-model="password" type="password" placeholder="Senha de primeiro acesso"/>
      </div>

      <button class="btn-create" @click="createUser">Criar</button>

    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  defaultUsername: {
    type: String,
    default: ''
  }
})

const username = ref(props.defaultUsername)
const level = ref('')
const email = ref('')
const password = ref('')

const message = ref('')
const isSuccess = ref(false)

function createUser() {
  if (!username.value || !level.value || !email.value || !password.value) {
    message.value = 'Por favor, preencha todos os campos!'
    isSuccess.value = false
    return
  }

  console.log({
    username: username.value,
    level: level.value,
    email: email.value,
    password: password.value
  })

  message.value = 'Usuário criado com sucesso!'
  isSuccess.value = true

  username.value = props.defaultUsername
  level.value = ''
  email.value = ''
  password.value = ''
}
</script>

<style>

.UserCreate-container {
  width: 31%;
  position: absolute;
  top: 15%;
  left: 5%;
  transform: none;
}

.card {
  background: #fff;
  border: 2px solid #502A81;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.label {
  font-size: 25px;
  font-weight: 600;
  color: #502A81;
  margin-bottom: 0px;
  position: relative;
  top: -5%;
}

</style>
