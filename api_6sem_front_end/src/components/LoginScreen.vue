<template>
  <div class="login-screen">
    <div class="login-box">
        <div class="login-form">
            <img src="../icons/LuminIA.ico" class="logo">
            <input type="text" id="usuario" placeholder="Usuário">
            <input type="password" id="senha" placeholder="Senha">
            <button class="btn-entrar">Entrar</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginScreen'
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
</style>