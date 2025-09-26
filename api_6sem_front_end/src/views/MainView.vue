<template>
  <div>
    <BackgroundMain />
    <FiltersButtons @open-tickets-filter="handleFilterOpened" @average-running-time-filter="handleFilterAverageTime" @exceeded-sla-filter="handleFilterExcedeedSLA" @by-month="handleFilterByMonth" @recurring-tickets="handleFilterRecurringTickets" @primary-themes="handleFilterPrimaryThemes"/>
    <BigNumberCards :resultOpened="resultOpened" :resultAverageTime="resultAverageTime" :resultSLAExceeded="resultSLAExceeded" :resultRecurringTickets="resultRecurringTickets" />
    <PeriodChart :resultByMonth="resultByMonth"/>
    <TotalSentimentVolumeChart />
    <MainTopicsChart :resultPrimaryThemes="resultPrimaryThemes" />
  </div>
</template>

<script>
import BackgroundMain from '@/components/BackgroundMain.vue';
import BigNumberCards from '@/components/BigNumberCards.vue';
import FiltersButtons from '@/components/FiltersButtons.vue';
import MainTopicsChart from '@/components/MainTopicsChart.vue';
import PeriodChart from '@/components/PeriodChart.vue';
import TotalSentimentVolumeChart from '@/components/TotalSentimentVolumeChart.vue';
import axios from 'axios';


export default {
  name: 'MainView',
  components: {
    BackgroundMain,
    FiltersButtons,
    BigNumberCards,
    PeriodChart,
    TotalSentimentVolumeChart,
    MainTopicsChart,
  },
  data() {
    return {
      resultOpened: null,
      resultAverageTime: null,
      resultSLAExceeded: null,
      resultByMonth: null,
      resultRecurringTickets: null,
      resultPrimaryThemes: null
    }
  },
  methods: {
    async fetchData(url, targetKey, filtros = {}) {
      try {
        const filtroParaEnviar = Object.keys(filtros).length ? filtros : {};
        const response = await axios.post(url, { filtro: filtroParaEnviar });
        this[targetKey] = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleFilterOpened(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/opened/count", "resultOpened", filtros);
    },
    handleFilterAverageTime(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/closed/average-time", "resultAverageTime", filtros);
    },
    handleFilterExcedeedSLA(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/closed/exceeded-sla", "resultSLAExceeded", filtros);
    },
    handleFilterByMonth(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/by-period", "resultByMonth", filtros);
    },
    handleFilterRecurringTickets(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/recurring-tickets", "resultRecurringTickets", filtros);
    },
    handleFilterPrimaryThemes(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/primary-themes", "resultPrimaryThemes", filtros);
    }
  },
  mounted() {
    this.handleFilterOpened();
    this.handleFilterAverageTime();
    this.handleFilterExcedeedSLA();
    this.handleFilterByMonth();
    this.handleFilterRecurringTickets();
    this.handleFilterPrimaryThemes();
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
