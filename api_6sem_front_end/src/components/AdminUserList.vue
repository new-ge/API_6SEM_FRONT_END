<template>
  <div class="userlist-container">
    <div class="card">

      <h2 class="title">Usuários</h2>

       <div class="form-group search-group">
        <label class="label" for="search"></label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Usuário"
        />
        <span class="icon">
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1"/>
        </span>
      </div>

      <div class="user-list">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="user-item"
        >
          <div class="icon-circle">A</div>

          <span class="user-text">
            {{ user.id }} | {{user.name }} | {{ user.email }}
          </span>
          <input type="checkbox" class="check" v-model="user.selected" />
        </div>
      </div>

      <div class="delete-container">
        <button class="delete-btn" @click="deleteSelected">Excluir</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  resultFindAllUsers: { 
    type: Array, 
    default: () => [] 
  } 
});

const emit = defineEmits(["find-all-users"]); 
const searchQuery = ref(""); 
const localUsers = ref([]);

watch( 
  () => props.resultFindAllUsers, 
  (newVal) => { 
    if (!Array.isArray(newVal)) { 
      localUsers.value = []; 
      return; 
    } 
    localUsers.value = newVal.map(u => ({ ...u, selected: false })); 
  }, 
  { immediate: true } 
);

const filteredUsers = computed(() => { 
  const q = searchQuery.value.toLowerCase();
  return localUsers.value.filter(u => { 
    const name = u.name?.toLowerCase() || ""; 
    const email = u.email?.toLowerCase() || ""; 
    const id = u.id?.toString() || ""; 
    return name.includes(q) || email.includes(q) || id.includes(q); 
  }); 
}); 

const deleteSelected = () => { 
  const selectedIds = localUsers.value
  .filter(u => u.selected)
  .map(u => u.id); 

  if (!selectedIds.length) return;
}
</script>

<style scoped>
.userlist-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 34vw;
  top: 0vh;
  width: 27vw;
  height: 80vh;
  margin: 0;
  box-sizing: border-box;
  padding: 0 10px;
}

.card {
  background: white;
  border: 1px solid #502A81;
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  width: 27vw;
  height: 80vh;

  overflow: hidden;
}

.title {
  color: #502A81;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 12px;
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 14px 18px;
  border: none;
  border-radius: 40px;
  background-color: #F1E8FF;
  font-size: 19px;
  color: #502A81;
  outline: none;
  box-sizing: border-box;
  height: 48px;
}

.form-group input::placeholder {
  color: #502A81;
  opacity: 1;
  font-family: "Poppins", sans-serif;
  font-size: 19px;
  font-weight: 500;
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

.search-group .icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.user-list {
  flex: 1;
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 6px;
}

.user-item {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 10px;
}

.icon-circle {
  background-color: rgba(80, 42, 129, 0.1);
  color: #502A81;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  font-size: 14px;
  font-weight: 600;
}

.user-text {
  flex: 1;
  color: #502A81;
  font-size: 14px;
  font-weight: 500;
}

.check {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #502A81;
}

.delete-container {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 40px;
  padding: 18px 36px;
  font-weight: 600;
  cursor: pointer;
  font-size: 18px;
  min-width: 160px;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #b71c1c;
}
</style>
