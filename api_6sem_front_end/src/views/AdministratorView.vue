  <template>
    <div class="admin-main-view">
      <BackgroundMain/>
      <div class="users-container">
        <AdminCreateUser/>
        <AdminEditUser />
        <AdminUserList />
      </div>

      <div class="logs-container">
        <AdminLogs/>
      </div>
    </div>
  </template>

  <script lang ="js">
  import AdminCreateUser from '@/components/AdminCreateUser.vue';
  import AdminEditUser from '@/components/AdminEditUser.vue';
  import AdminUserList from '@/components/AdminUserList.vue';
  import AdminLogs from '@/components/AdminLogs.vue';
  import BackgroundMain from '@/components/BackgroundMain.vue';

  export default{
    name: "AdministratorView",
    components: {
      AdminCreateUser,
      AdminEditUser,
      AdminUserList,
      AdminLogs,
      BackgroundMain,
    }
  };

  </script>

  <style scoped>
  .admin-main-view {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
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
    gap: 30px;
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    max-width: 400px;
  }

  .logs-container {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 520px;
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
