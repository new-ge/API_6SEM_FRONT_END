  <template>
    <div class="admin-main-view">
      <BackgroundMain/>
      <div class="users-container">
        <AdminCreateUser :resultCreateUsers="resultCreateUsers" @create-users="handleCreateUsers" />
        <AdminEditUser :resultUpdateUsers="resultUpdateUsers" @update-users="handleUpdateUsers" />
        <AdminUserList :resultFindAllUsers="resultFindAllUsers" @find-all-users="handleFindAllUsers" />
      </div>
    </div>
  </template>

  <script lang ="js">
  import AdminCreateUser from '@/components/AdminCreateUser.vue';
  import AdminEditUser from '@/components/AdminEditUser.vue';
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

          console.log(data)

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
  .admin-main-view {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: auto;
    width: 100%;
    background: linear-gradient(to right, white, #AB93F8);
    color: #502A81;
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow-y: auto;
  }

  .users-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    left: 2.5em;
    top: 5.5em;
    width: 100%;
    max-width: 400px;
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
