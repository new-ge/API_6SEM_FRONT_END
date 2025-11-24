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
          <div class="col">{{ formatDate(log.performed_at) }}</div>
          <div class="col">{{ log.action }}</div>
          <div class="col">{{ log.modified_by }}</div>
          <div class="col">{{ log.modified_user }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const logs = ref([]);

const props = defineProps({
  resultLogs: { 
    type: Array, 
    default: () => [] 
  }
})

watch(
  () => props.resultLogs,
  (newVal) => {
    logs.value = newVal ?? [];
  },
  { immediate: true }
);

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();

  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  const segundos = String(date.getSeconds()).padStart(2, '0');

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

</script>

<style scoped>
.logs-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0vh;
  right: 2.3vw;
  height: 80vh;
  margin: 0;
  box-sizing: border-box;
  padding: 0 10px;
   z-index: 10;
}

.card {
  background: white;
  border: 1px solid #502A81;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 80vh;
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
