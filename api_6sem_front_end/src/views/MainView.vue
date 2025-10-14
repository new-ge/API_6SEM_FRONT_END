<template>
  <div>
    <BackgroundMain />
    <FiltersButtons @open-tickets-filter="handleFilterOpened" @average-running-time-filter="handleFilterAverageTime" @exceeded-sla-filter="handleFilterExcedeedSLA" @by-month="handleFilterByMonth" @recurring-tickets="handleFilterRecurringTickets" @primary-themes="handleFilterPrimaryThemes" @sentiment-volume="handleFilterSentimentVolume"/>
    <BigNumberCards :resultOpened="resultOpened" :resultAverageTime="resultAverageTime" :resultSLAExceeded="resultSLAExceeded" :resultRecurringTickets="resultRecurringTickets" />
    <PeriodChart :resultByMonth="resultByMonth" :resultForecast="resultForecast"/>
    <TotalSentimentVolumeChart :resultPositive="resultPositive" :resultNegative="resultNegative"/>
    <MainTopicsChart :resultPrimaryThemes="resultPrimaryThemes"/>
  </div>
</template>

<script lang="js">
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
      resultForecast: null,
      resultPrimaryThemes: null,
      resultNegative: null,
      resultPositive: null
    }
  },
  methods: {
    async fetchData(url, filtros = {}, mapping = {}) {
      try {
        const token = localStorage.getItem("token");
        const filtroParaEnviar = Object.keys(filtros).length ? filtros : {};

        const response = await axios.post(
          url,
          { filtro: filtroParaEnviar },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        for (const [respKey, varName] of Object.entries(mapping)) {
          if (response.data[respKey] !== undefined) {
            this[varName] = response.data[respKey];
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },

    handleFilterOpened(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/opened/count", filtros, { opened_tickets: "resultOpened" });
    },
    handleFilterAverageTime(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/closed/average-time", filtros, { average_duration_minutes: "resultAverageTime" });
    },
    handleFilterExcedeedSLA(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/closed/exceeded-sla", filtros, { sla_exceeded: "resultSLAExceeded" });
    },
    handleFilterByMonth(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/by-period", filtros, { tickets: "resultByMonth", forecast: "resultForecast" });
    },
    handleFilterRecurringTickets(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/recurring-tickets", filtros, { recurring_tickets: "resultRecurringTickets" });
    },
    handleFilterPrimaryThemes(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/primary-themes", filtros, { primary_themes: "resultPrimaryThemes"});
    },
    handleFilterSentimentVolume(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/sentiment", filtros, { negative: "resultNegative", positive: "resultPositive" });
    },
  },
  async mounted() {
    const response = await axios.get("http://localhost:8000/");
    const token = response.data.token;
    localStorage.setItem("token", token);
    this.handleFilterOpened();
    this.handleFilterAverageTime();
    this.handleFilterExcedeedSLA();
    this.handleFilterByMonth();
    this.handleFilterRecurringTickets();
    this.handleFilterPrimaryThemes();
    this.handleFilterSentimentVolume();
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
