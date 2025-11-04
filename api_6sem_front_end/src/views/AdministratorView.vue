  <template>
    <div class="admin-main-view">
      <BackgroundMain/>

      <AdminCreateUser :defaultUsername="'Novo Usuário'"/>
    </div>
  </template>

  <script lang ="js">
  import AdminCreateUser from '@/components/AdminCreateUser.vue';
  import BackgroundMain from '@/components/BackgroundMain.vue';

  export default{
    name: "AdministratorView",
    components: {
      AdminCreateUser,
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
  </style>
