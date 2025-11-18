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

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <h2 class="popup-title">Crie sua Senha</h2>
        <input v-model="newPassword" type="password" placeholder="Nova senha">
        <input v-model="confirmPassword" type="password" placeholder="Confirmar senha">
        <button @click="salvarSenha">Salvar</button>
        <button class="cancel" @click="showPopup = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginScreen",
  data() {
    return {
      usuario: "",
      senha: "",
      showPopup: false,
      newPassword: "",
      confirmPassword: ""
    }
  },
  methods: {
    handleLogin() {
      const email = this.usuario?.trim() || ""
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        alert("Usuário inválido! Digite um e-mail válido.")
        return
      }

      this.showPopup = true
    },

    salvarSenha() {
      if (this.newPassword !== this.confirmPassword) {
        alert("As senhas não coincidem!")
        return
      }
      alert("Senha salva! (modo de teste)")
      this.showPopup = false
    }
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

.popup .cancel {
  background-color: #aaa !important;
}

.popup .cancel:hover {
  background-color: #888 !important;
}

.popup-title {
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #502A81;
}
</style>