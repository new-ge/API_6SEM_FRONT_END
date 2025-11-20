<template>
  <div class="logs-container">
    <div class="card">
      <h2 class="title">LOGs</h2>

      <div class="table-header">
        <div class="col">Data e Hora</div>
        <div class="col">Ação</div>
        <div class="col">Executante</div>
        <div class="col">Usuário</div>
      </div>

      <div class="table-body">
        <div
          v-for="log in logs"
          :key="log.id"
          class="table-row"
        >
          <div class="col">{{ log.datetime }}</div>
          <div class="col">{{ log.action }}</div>
          <div class="col">{{ log.actor }}</div>
          <div class="col">{{ log.user }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logs = ref([
  {
    id: 1,
    datetime: "01/10/2024 14:22",
    action: "Criou usuário",
    actor: "Adm N3",
    user: "Marcos"
  }
]);
</script>

<style scoped>
.logs-container {
  top: 60vw;
  right: 40vw;
  width: 10vw;
}

.card {
  background: white;
  border: 1px solid #502A81;
  border-radius: 12px;
  padding: 20px 24px;
  font-family: "Poppins", sans-serif;
  min-height: 80vh;
  max-height: 120vh;
  overflow: hidden;
}

.title {
  color: #502A81;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 0;
  border-bottom: 2px solid #502A81;
  font-size: 14px;
  font-weight: 600;
  color: #502A81;
}

.table-body {
  overflow-y: auto;
  height: calc(100% - 90px);
  padding-right: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 0;
  border-bottom: 1px solid rgba(80, 42, 129, 0.2);
  color: #502A81;
  font-size: 14px;
}
</style>
