<template>
    <div>
        <AnalystBackgroundMain />
        <AnalystFiltersButtons @open-tickets-filter="handleFilterOpened" @average-running-time-filter="handleFilterAverageTime" @exceeded-sla-filter="handleFilterExcedeedSLA" @by-month="handleFilterByMonth" @recurring-tickets="handleFilterRecurringTickets" @sentiment-volume="handleFilterSentimentVolume"/>
        <AnalystBigNumberCards :resultOpened="resultOpened" :resultAverageTime="resultAverageTime" :resultSLAExceeded="resultSLAExceeded" :resultRecurringTickets="resultRecurringTickets"/>
        <AnalystTotalSentimentVolumeChart :resultNegative="resultNegative"/>
        <AnalystPeriodChart :resultByMonth="resultByMonth"/>
    </div>
</template>

<script lang="js">
import { useAuthStore } from '@/stores/auth'
import AnalystBackgroundMain from '@/components/AnalystBackgroundMain.vue';
import AnalystFiltersButtons from '@/components/AnalystFiltersList.vue';
import AnalystBigNumberCards from '@/components/AnalystBigNumberCards.vue';
import AnalystTotalSentimentVolumeChart from '@/components/AnalystTotalSentimentVolumeChart.vue';
import AnalystPeriodChart from '@/components/AnalystPeriodChart.vue';
import axios from 'axios';

export default {
  name: 'AnalystMainView',
  components: {
    AnalystBackgroundMain,
    AnalystFiltersButtons,
    AnalystBigNumberCards,
    AnalystTotalSentimentVolumeChart,
    AnalystPeriodChart,
  },
    data() {
    return {
      resultOpened: null,
      resultAverageTime: null,
      resultSLAExceeded: null,
      resultByMonth: null,
      resultRecurringTickets: null,
      resultNegative: null
    }
  },
  methods: {
    async fetchData(url, filtros = {}, mapping = {}) {
      try {
        const authStore = useAuthStore()
        const token = authStore.token

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
      return this.fetchData("http://localhost:8000/tickets/by-period?include_forecast=False", filtros, { tickets: "resultByMonth"});
    },
    handleFilterRecurringTickets(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/recurring-tickets", filtros, { recurring_tickets: "resultRecurringTickets" });
    },
    handleFilterSentimentVolume(filtros = {}) {
      return this.fetchData("http://localhost:8000/tickets/sentiment?include_positive=False", filtros, { negative: "resultNegative" });
    },
  },
  async mounted() {
    this.handleFilterOpened();
    this.handleFilterAverageTime();
    this.handleFilterExcedeedSLA();
    this.handleFilterByMonth();
    this.handleFilterRecurringTickets();
    this.handleFilterSentimentVolume();
  }
};

</script>

<style scoped>

.main-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>