<template>
  <div class="admin-wrapper">
    <BackgroundMain />
    <div class="admin-main-view">
      <div class="create-edit-container">
        <AdminCreateUser :resultCreateUsers="resultCreateUsers" @create-users="handleCreateUsers" />
        <AdminEditUser :resultUpdateUsers="resultUpdateUsers" @update-users="handleUpdateUsers" :resultFindUser="resultFindUser" @search-user="handleFindUser"/>
      </div>
      <div class="users-container">
        <AdminUserList :resultFindAllUsers="resultFindAllUsers" :resultDeleteUsers="resultDeleteUsers" @delete-users="handleDeleteUsers"/>
      </div>
      <div class="logs-container">
        <AdminLogs :resultLogs="resultLogs" />
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
import { useToast } from 'vue-toastification';

const toast = useToast();

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
        resultUpdateUsers: [],
        resultFindUser: null,
        resultDeleteUsers: [],
        resultLogs: []
      }
    },
    methods: {
      async fetchData(method, url, body = null) {
        try {
          const token = useAuthStore().token;

          const response = await axios({
            method,
            url,
            data: body,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          });

          let data = response.data;

          if (data === null || data === undefined) {
            return { success: false, error: "Nenhum dado retornado pelo servidor." };
          }

          if (data.error) {
            return { success: false, error: data.error };
          }

          if (Array.isArray(data)) {
            return { success: true, data };
          }

          return { success: true, ...data };

        } catch (error) {
          console.error(`Erro ao fazer ${method} em ${url}:`, error);
          return { success: false, error: "Erro ao conectar com o servidor" };
        }
      },

      async handleFindAllUsers() {
        const res = await this.fetchData("get", "http://localhost:8000/users/get-all-users");
        this.resultFindAllUsers = [...res.data];
      },
      async handleCreateUsers(body) {
        this.resultCreateUsers = await this.fetchData("post", "http://localhost:8000/users/create", body);
        await this.handleLogs();
        await this.handleFindAllUsers();
      },
      async handleFindUser(body) {
        const query = body.includes("@")
          ? `?email=${body}`
          : `?name=${body}`;

        this.resultFindUser = await this.fetchData(
          "get",
          `http://localhost:8000/users/find${query}`
        );

        if (!this.resultFindUser.success) {
          toast.error("O usuário não foi encontrado!");
          return;
        }
      },
      async handleUpdateUsers(body) {
        this.resultUpdateUsers = await this.fetchData("put", "http://localhost:8000/users/edit", body);

        await this.handleLogs();
        await this.handleFindAllUsers();
      },
      async handleDeleteUsers(body) {
        this.resultDeleteUsers = await this.fetchData("post", "http://localhost:8000/users/delete-users", body);

        await this.handleFindAllUsers();
        await this.handleLogs();
      },
      async handleLogs() {
        const res = await this.fetchData("get", "http://localhost:8000/history/get-all-logs");
        this.resultLogs = res.data;
      },
    },

    async mounted() {
      await this.handleFindAllUsers();
      await this.handleLogs();
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