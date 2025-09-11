<template>
  <div>
    <BackgroundMain />
    <FiltersButtons />
  </div>
</template>

<script>
import BackgroundMain from '@/components/BackgroundMain.vue';
import FiltersButtons from '@/components/FiltersButtons.vue';

export default {
  name: 'MainView',
  components: {
    BackgroundMain,
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
