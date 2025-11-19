<script setup>
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <div>
    <h1>Sandbox</h1>
        <p><strong>Nome:</strong> {{ userStore.name }}</p>
        <p><strong>Email:</strong> {{ userStore.email }}</p>
        <p><strong>Role:</strong> {{ userStore.role }}</p>
  </div>
</template>
