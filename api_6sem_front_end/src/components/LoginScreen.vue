<template>
  <div class="login-screen">
    <div class="login-box">
      <div class="login-form">
        <img src="../icons/LuminIA.ico" class="logo">
        <input type="email" v-model.trim="usuario" placeholder="E-mail">
        <input type="password" v-model="senha" placeholder="Senha">
        <button class="btn-entrar" @click="handleLogin">Entrar</button>
      </div>
    </div>
    <div v-if="props.showPopup" class="popup-overlay">
      <div class="popup">
        <h2 class="popup-title">Vejo que está logando pela primeira vez, para entrar, é necessário criar sua própria senha!</h2>
        <input v-model="newPassword" type="password" placeholder="Nova senha">
        <input v-model="confirmPassword" type="password" placeholder="Confirmar senha">
        <button @click="handleUpdateUser">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const usuario = ref("")
const senha = ref("")
const newPassword = ref("")
const confirmPassword = ref("")

const props = defineProps({
  showPopup: Boolean
})

const emit = defineEmits(["login", "save"]);

function handleLogin() {
  emit("login", { username: usuario.value, password: senha.value })
}

function handleUpdateUser() {
  if (newPassword.value == confirmPassword.value) {
    emit("save", { username: usuario.value, new_password: confirmPassword.value })
  } else {
    toast.error("As senhas não coincidem!")
  }
}

</script>

<style scoped>
.login-screen {
  background-image: url('@/assets/BackgroundLogin.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.login-box {
  background-color: rgb(255, 255, 255);
  height: 60%;
  width: 38%;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(255, 254, 254, 0.6);
  text-align: center;
}

.login-form {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.login-form input {
  width: 50%;
  padding: 10px;
  margin-top: 32px;
  border: 1px solid #502A81;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
  background-color: #ab93f847;
}

.login-form input:focus {
  border-color: #6a5acd;
}

.btn-entrar {
  margin-top: 7%;
  width: 30%;
  padding: 10px;
  background-color: #502A81;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-entrar:hover {
  background-color: #5941c3;
}

.popup-overlay {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100vw; 
  height: 100vh;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: rgb(255, 255, 255);
  width: 38%;
  height: 55%;
  border-radius: 10px;
  box-shadow: 0 1px 15px rgba(255, 254, 254, 0.6);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
 }

.popup input {
  width: 50%;
  padding: 10px;
  margin-top: 22px;
  border: 1px solid #502A81;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
  background-color: #ab93f847;
}

.popup input:focus {
  border-color: #6a5acd;
}

.popup button {
  margin-top: 25px;
  width: 40%;
  padding: 10px;
  background-color: #502A81;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.popup button:hover {
  background-color: #5941c3;
}

.popup-title {
  margin: 4%;
  font-size: 24px;
  font-weight: bold;
  color: #502A81;
}
</style>