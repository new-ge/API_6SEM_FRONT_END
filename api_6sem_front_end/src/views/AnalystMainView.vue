<template>
    <div>
        <AnalystBackgroundMain />
        <AnalystFiltersButtons />
        <AnalystBigNumberCards />
        <AnalystTotalSentimentVolumeChart />
    </div>
</template>

<script lang="js">
import AnalystBackgroundMain from '@/components/AnalystBackgroundMain.vue';
import AnalystFiltersButtons from '@/components/AnalystFiltersButtons.vue';
import AnalystBigNumberCards from '@/components/AnalystBigNumberCards.vue';
import AnalystTotalSentimentVolumeChart from '@/components/AnalystTotalSentimentVolumeChart.vue';

export default {
  name: 'AnalystMainView',
  components: {
    AnalystBackgroundMain,
    AnalystFiltersButtons,
    AnalystBigNumberCards,
    AnalystTotalSentimentVolumeChart,
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