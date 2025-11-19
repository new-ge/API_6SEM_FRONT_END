<template>
  <div class="gradient-background">
    <img src="../icons/LuminIA.ico" class="top-left-icon"/>
    <svg class="avatar-icon" width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg" @click="detailsUser" style="cursor: pointer;" >
        <rect width="83" height="83" rx="41.5" fill="#502A81"/>
        <path d="M57.5 59.5V55.5C57.5 53.3783 56.6571 51.3434 55.1569 49.8431C53.6566 48.3429 51.6217 47.5 49.5 47.5H33.5C31.3783 47.5 29.3434 48.3429 27.8431 49.8431C26.3429 51.3434 25.5 53.3783 25.5 55.5V59.5M49.5 31.5C49.5 35.9183 45.9183 39.5 41.5 39.5C37.0817 39.5 33.5 35.9183 33.5 31.5C33.5 27.0817 37.0817 23.5 41.5 23.5C45.9183 23.5 49.5 27.0817 49.5 31.5Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function detailsUser() {
  router.push('/sandbox')
}
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

.avatar-icon{
  position: absolute;
  top: 2%;
  right: 0%;
  height: 7%;   
}
</style>
