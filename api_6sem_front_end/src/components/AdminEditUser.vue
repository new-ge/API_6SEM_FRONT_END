<template>
  <div class="UserEdit-container">
    <div class="card">
      <h2 class="title">Editar usuário</h2>

      <div class="form-group search-group">
        <label class="label" for="search"></label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          placeholder="Digite usuário ou e-mail"
        />
        <span class="icon" @click="searchUser">
          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/search--v1.png" alt="search--v1"/>
        </span>
      </div>

      <div class="form-group">
        <label class="label" for="username"></label>
        <input id="username" v-model="username" type="text" placeholder="Novo nome do usuário" :disabled="!isUserLoaded">
      </div>

      <div class="form-group">
        <label class="label" for="email"></label>
        <input id="email" v-model="email" type="email" placeholder="Novo e-mail" :disabled="!isUserLoaded" />
      </div>

      <div class="form-group">
        <label class="label" for="role"></label>
        <select id="role" v-model="role" :disabled="!isUserLoaded">
          <option value="" disabled>Nível</option>
          <option value="N1">Analista N1</option>
          <option value="N2">Analista N2</option>
          <option value="N3">Analista N3</option>
          <option value="Gestor">Gestor</option>
        </select>
      </div>

      <button class="btn-create" @click="updateUser">Atualizar</button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { ref, watch } from 'vue';

const toast = useToast();

const emit = defineEmits(["update-users", "search-user"]); 

const props = defineProps({
  resultUpdateUsers: {
    type: Object,
    default: () => ({})
  },
  resultFindUser: { 
    type: Object, 
    default: () => ({}) 
  }
})

const isUserLoaded = ref(false);
const searchQuery = ref('');
const username = ref('');
const email = ref('');
const role = ref('');

function searchUser() {
  if (!searchQuery.value) {
    toast.error('Digite um usuário ou e-mail para buscar.');
    return;
  }

  useAuthStore().token
        
  emit("search-user", searchQuery.value);
}

watch(() => props.resultFindUser, (newValue) => {
  if (!newValue) return;

  if (newValue.role === "Administrador") {
    toast.error("Não é possível editar um Administrador");
    return;
  }
  username.value = newValue.username;
  email.value = newValue.email;
  role.value = newValue.role;
  isUserLoaded.value = true;
});

function updateUser() {
  if (!username.value || !email.value || !role.value) {
    toast.error('Por favor, preencha todos os campos.');
    return;
  }

  useAuthStore().token

  emit("update-users", {
    identifier: searchQuery.value, 
    update: {
      name: username.value,
      email: email.value,
      role: role.value
    }
  });

  toast.success('Usuário atualizado com sucesso!');
  
  isUserLoaded.value = false
  username.value = ''
  email.value = ''
  role.value = ''
  searchQuery.value = '';
}
</script>

<style scoped>

.UserEdit-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 26vw;
  height: 38vh;
  left: 5.5vh;
  top: 42vh;
  margin: 0;
  box-sizing: border-box;
  padding: 0 10px;
}

.card {
  width: 26vw;  
  height: 38vh;
  left: 5.5vh;
  background: white;
  border: 1px solid #502A81;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 19px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 8vw;
  font-family: 'Poppins', sans-serif;
}

.title {
  color: #502A81;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 18px;
  text-transform: lowercase;
}

.title::first-letter {
  text-transform: uppercase;
}

.form-group {
  margin-bottom: 12px;
  position: relative;
}

input,
select {
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background-color: #F1E8FF;
  font-size: 14px;
  color: #502A81;
  outline: none;
  appearance: none;
  box-sizing: border-box;
}

select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23502A81' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 36px;
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

.btn-create {
  width: 100%;
  background-color: #502A81;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  margin-top: 4px;
}

.btn-create:hover {
  background-color:  #6739b7;
}

.toast-success {
  background-color: #4CAF50 !important;
  color: white !important;
}

.toast-error {
  background-color: #f44336 !important;
  color: white !important;
}

input::placeholder,
select::placeholder {
  color: #502A81;
  opacity: 0.7;
}

.search-group .icon img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

select:disabled {
  cursor: initial;
}
</style>
