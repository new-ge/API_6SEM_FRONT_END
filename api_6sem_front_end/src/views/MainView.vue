<template>
  <div>
    <BackgroundMain />
    <FiltersButtons />
    <BigNumberCards />
    <PeriodChart />
  </div>
</template>

<script>
import BackgroundMain from '@/components/BackgroundMain.vue';
import FiltersButtons from '@/components/FiltersButtons.vue';
import BigNumberCards from '@/components/BigNumberCards.vue';
import PeriodChart from '@/components/PeriodChart.vue';

export default {
  name: 'MainView',
  components: {
    BackgroundMain,
    FiltersButtons,
    BigNumberCards,
    PeriodChart,
  }
}

</script>

<style scoped>
.main-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
