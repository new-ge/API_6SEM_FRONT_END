<template>
  <div class="gradient-background">
    <img src="../icons/LuminIA.ico" class="top-left-icon"/>
    <div class="avatar-container" @click="showAvatarPopup = true">
      <svg class="avatar-icon" width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="83" height="83" rx="41.5" fill="#502A81"/>
          <path d="M57.5 59.5V55.5C57.5 53.3783 56.6571 51.3434 55.1569 49.8431C53.6566 48.3429 51.6217 47.5 49.5 47.5H33.5C31.3783 47.5 29.3434 48.3429 27.8431 49.8431C26.3429 51.3434 25.5 53.3783 25.5 55.5V59.5M49.5 31.5C49.5 35.9183 45.9183 39.5 41.5 39.5C37.0817 39.5 33.5 35.9183 33.5 31.5C33.5 27.0817 37.0817 23.5 41.5 23.5C45.9183 23.5 49.5 27.0817 49.5 31.5Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <div v-if="showAvatarPopup" class="avatar-popup">
      <div class="avatar-popup-content">
        <button class="close-btn" @click="showAvatarPopup = false">X</button>
        <p class="avatar-popup-text">Nome: {{userStore.name }}</p>
        <p E-mail: class="avatar-popup-text">E-mail: {{userStore.email }}</p>
        <p class="avatar-popup-text">Role: {{userStore.role}}</p>
        <button class="avatar-popup-button" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from "@/stores/userStore";
  import { useAuthStore} from "@/stores/auth";  
  import { ref } from 'vue';

  const userStore = useUserStore();
  const showAvatarPopup = ref(false);
  const authStore = useAuthStore();

  const logout = () => {
    authStore.token = "";
    userStore.reset();
    window.location.href = "http://localhost:5173";
};
</script>


<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.gradient-background {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, white, #AB93F8);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
}

.top-left-icon {
  position: absolute;
  top: 1%;
  left: 1%;
  height: 10%;
}

.avatar-container {
  position: absolute;
  top: 2%;
  right: 1.5%;
  cursor: pointer;
}

.avatar-icon {
  margin-left: 12%;
  height: 56%;
  width: 82%;
  transition: opacity 0.2s;
}

.avatar-icon:hover {
  opacity: 0.8;
}

.avatar-popup {
  position: fixed;
  top: 5%;
  right: 6.5%;
  background: rgba(0,0,0,0.45);
  padding: 10px;
  border-radius: 10px;
  z-index: 9999;
}

.avatar-popup-content {
  background: white;
  padding: 15px 20px;
  border-radius: 10px;
  min-width: 220px;
  min-height: 80px;
  position: relative;
  box-shadow: 0 1px 10px rgba(255, 255, 255, 0.6);
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #502A81;
  font-weight: bold;
}

.close-btn:hover {
  opacity: 0.7;
}

.avatar-popup-text {
  margin-top: 15px;
  color: #502A81;
  font-size: 16px;
  font-weight: bold;
}

.avatar-popup-button{
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
  margin-left: 30%;
}
</style>
