<template>
  <div class="admin-wrapper">
    <BackgroundMain />
    <div class="admin-main-view">
      <div class="create-edit-container">
        <AdminCreateUser :resultCreateUsers="resultCreateUsers" @create-users="handleCreateUsers" />
        <AdminEditUser :resultUpdateUsers="resultUpdateUsers" @update-users="handleUpdateUsers" />
      </div>
      <div class="users-container">
        <AdminUserList :resultFindAllUsers="resultFindAllUsers" @find-all-users="handleFindAllUsers" />
      </div>
      <div class="logs-container">
        <AdminLogs/>
      </div>
    </div>

  </div>
</template>

<script lang ="js">
import AdminCreateUser from '@/components/AdminCreateUser.vue';
import AdminEditUser from '@/components/AdminEditUser.vue';
import AdminLogs from '@/components/AdminLogs.vue';
import AdminUserList from '@/components/AdminUserList.vue';
import BackgroundMain from '@/components/BackgroundMain.vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

export default {
    name: "AdministratorView",
    components: {
      AdminCreateUser,
      AdminEditUser,
      AdminUserList,
      AdminLogs,
      BackgroundMain,
    },
    data() { 
      return { 
        resultFindAllUsers: [],
        resultCreateUsers: [],
        resultUpdateUsers: []
      }
    },
    methods: {
      async fetchData(method, url, body = null) {
        try {
          const token = useAuthStore().token;

          const response = await axios({
            method: method,
            url: url,
            data: body,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          });

          let data = response.data;

          if (!Array.isArray(data) && typeof data === "object") {
            data = Object.values(data);
          }

          return data;

        } catch (error) {
          console.error(`Erro ao fazer ${method} em ${url}:`, error);
          throw error;
        }
      },

      async handleFindAllUsers() {
        this.resultFindAllUsers = await this.fetchData("get", "http://localhost:8000/get-all/get-all-users");
      },
      async handleCreateUsers(body) {
        this.resultCreateUsers = await this.fetchData("post", "http://localhost:8000/users/create", body);
      },
      async handleUpdateUsers(body) {
        this.resultUpdateUsers = await this.fetchData("put", "http://localhost:8000/users/edit", body);
      },
    },

    async mounted() {
      await this.handleFindAllUsers();
    }

  };

</script>

<style scoped>

.admin-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.admin-wrapper > *:first-child {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.admin-main-view {
  position: relative;
  display: grid;
  top: 13vh;
}

.users-container,
.logs-container {
  display: flex;
  flex-direction: column;
  width: 32vw;
}

.create-edit-container {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .users-container {
    position: static;
    transform: none;
    margin: 40px auto;
    align-items: center;
    padding: 0 20px;
  }
}

</style>