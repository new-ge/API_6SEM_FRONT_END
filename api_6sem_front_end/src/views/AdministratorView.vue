<template>
  <div class="admin-wrapper">
    <BackgroundMain />
    <div class="consent-component" v-if="showConsent">
      <ConsentComponent 
        :agent_id="userStore.agent_id" 
        @term="handleConsentment" 
      />
    </div>
    <div class="admin-main-view">
      <div class="create-edit-container">
        <AdminCreateUser :resultCreateUsers="resultCreateUsers" @create-users="handleCreateUsers" :checkUserEmail="checkUserByEmail"  />
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
import ConsentComponent from '@/components/ConsentComponent.vue';
import AdminUserList from '@/components/AdminUserList.vue';
import BackgroundMain from '@/components/BackgroundMain.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';

export default {
    name: "AdministratorView",
    components: {
      AdminCreateUser,
      AdminEditUser,
      AdminUserList,
      AdminLogs,
      BackgroundMain,
      ConsentComponent
    },
    data() { 
      return { 
        showConsent: false,
        authStore: useAuthStore(),
        userStore: useUserStore(),
        resultFindAllUsers: [],
        resultCreateUsers: [],
        resultUpdateUsers: [],
        resultFindUser: null,
        resultDeleteUsers: [],
        resultLogs: [],
        checkUserEmail: null
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
        this.resultFindUser = await this.fetchData(
          "get",
          `http://localhost:8000/users/find?email=${body}`
        );
      },
      async checkUserByEmail(body) {
        const res = await this.fetchData(
          "get",
          `http://localhost:8000/users/find?email=${body}`
        );

        return res.success && res.email ? true : false;
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
      async handleConsentment(consentData) {
        const res = await this.fetchData(
          "put",
          "http://localhost:8000/users/consent",
          {
            agent_id: this.userStore.agent_id,
            consent: consentData.consent
          }
        );

        if (res.success) {
          this.showConsent = false;
          if (!consentData.consent) {
            this.authStore.token = "";
            this.userStore.reset();
            window.location.href = "http://localhost:5173";
          }
        } else {
          console.error("Erro ao enviar consentimento:", res.error);
        }
      },

      async checkConsent() {
        const user_id_logged = this.userStore.agent_id;
        const res = await this.fetchData(
          "get", 
          `http://localhost:8000/users/consent-status?agent_id=${user_id_logged}&`
        );

        if (res.success) {
          this.showConsent = !res.consent;
        } else {
          console.error("Erro ao verificar consentimento:", res.error);
          this.showConsent = true;
        }
      }
    },

    async mounted() {
      await this.handleFindAllUsers();
      await this.handleLogs();
      await this.checkConsent();
    }

  };

</script>

<style scoped>

.consent-component {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background-color: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  padding: 20px;
  overflow-y: auto;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  z-index: 1000;
}

.consent-container h2,
.consent-container h3 {
  color: #333;
}

.consent-container ul {
  margin-left: 20px;
}

.consent-container .buttons {
  margin-top: 20px;
  text-align: center;
}

.consent-container button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.consent-container button:first-child {
  background-color: #4caf50;
  color: white;
}

.consent-container button:last-child {
  background-color: #f44336;
  color: white;
}

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