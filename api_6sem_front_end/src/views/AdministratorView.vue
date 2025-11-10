  <template>
    <div class="admin-main-view">
      <BackgroundMain/>
      <div class="users-container">
        <AdminCreateUser :defaultUsername="'Novo Usuário'"/>
        <AdminEditUser />
      </div>
    </div>
  </template>

  <script lang ="js">
  import AdminCreateUser from '@/components/AdminCreateUser.vue';
  import AdminEditUser from '@/components/AdminEditUser.vue';
  import BackgroundMain from '@/components/BackgroundMain.vue';

  export default{
    name: "AdministratorView",
    components: {
      AdminCreateUser,
      AdminEditUser,
      BackgroundMain
    }
  };

  </script>

  <style scoped>
  .admin-main-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, white, #AB93F8);
    color: #502A81;
    text-align: center;
    font-family: Arial, sans-serif;
  }

  .users-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

  </style>
