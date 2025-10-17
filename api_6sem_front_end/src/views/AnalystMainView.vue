<template>
    <div>
        <AnalystBackgroundMain />
        <AnalystFiltersButtons />
        <AnalystBigNumberCards />
    </div>
</template>

<script lang="js">
import AnalystBackgroundMain from '@/components/AnalystBackgroundMain.vue';
import AnalystFiltersButtons from '@/components/AnalystFiltersButtons.vue';
import AnalystBigNumberCards from '@/components/AnalystBigNumberCards.vue';

export default {
  name: 'AnalystMainView',
  components: {
    AnalystBackgroundMain,
    AnalystFiltersButtons,
    AnalystBigNumberCards,
  },
};

</script>

<style scoped>

.main-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>