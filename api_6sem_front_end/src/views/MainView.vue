<template>
  <div>
    <BackgroudMain />
    <FiltersButtons />
  </div>
</template>

<script>
import BackgroudMain from '@/components/BackgroudMain.vue';
import FiltersButtons from '@/components/FiltersButtons.vue';

export default {
  name: 'MainView',
  components: {
    BackgroudMain,
    FiltersButtons,
  }
}

</script>

<style scoped>
.main-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* evita scroll desnecessário */
}
</style>
