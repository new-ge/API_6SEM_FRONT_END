<template>
    <div class="consent-component" v-if="showConsent">
      <ConsentComponent 
        :agent_id="userStore.agent_id" 
        @term="handleConsentment" 
      />
    </div>
    <div>
        <AnalystBackgroundMain />
        <AnalystNoFAQFiltersList @open-tickets-filter="handleFilterOpened" @average-running-time-filter="handleFilterAverageTime" @exceeded-sla-filter="handleFilterExcedeedSLA" @by-month="handleFilterByMonth" @recurring-tickets="handleFilterRecurringTickets" @sentiment-volume="handleFilterSentimentVolume"/>
        <AnalystBigNumberCards :resultOpened="resultOpened" :resultAverageTime="resultAverageTime" :resultSLAExceeded="resultSLAExceeded" :resultRecurringTickets="resultRecurringTickets"/>
        <AnalystTotalSentimentVolumeChart :resultNegative="resultNegative"/>
        <AnalystPeriodChart :resultByMonth="resultByMonth"/>
    </div>
</template>

<script lang="js">
import { useAuthStore } from '@/stores/auth'
import AnalystBackgroundMain from '@/components/AnalystBackgroundMain.vue';
import AnalystNoFAQFiltersList from '@/components/AnalystNoFAQFiltersList.vue';
import AnalystBigNumberCards from '@/components/AnalystBigNumberCards.vue';
import AnalystTotalSentimentVolumeChart from '@/components/AnalystTotalSentimentVolumeChart.vue';
import AnalystPeriodChart from '@/components/AnalystPeriodChart.vue';
import ConsentComponent from '@/components/ConsentComponent.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'AnalystMainView',
  components: {
    AnalystBackgroundMain,
    AnalystNoFAQFiltersList,
    AnalystBigNumberCards,
    AnalystTotalSentimentVolumeChart,
    AnalystPeriodChart,
    ConsentComponent
  },
  data() {
    return {
      showConsent: false,
      authStore: useAuthStore(),
      userStore: useUserStore(),
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
      async handleConsentment(consentData) {
        const authStore = useAuthStore()
        const token = authStore.token

        const userStore = useUserStore()
        const user_id_logged = userStore.agent_id

        const res = await axios.put(
          "http://localhost:8000/users/consent",
          {
            agent_id: user_id_logged,
            consent: consentData.consent
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        if (res.data.consent === true) {
          this.showConsent = false;
        } else {
          this.showConsent = true;
        } 
        
        if (res.data.consent === false) {
          this.authStore.token = "";
          this.userStore.reset();
          window.location.href = "http://localhost:5173";
        }
      },

      async checkConsent() {
        const authStore = useAuthStore()
        const token = authStore.token

        const userStore = useUserStore()
        const user_id_logged = userStore.agent_id

        const res = await axios.get(
          `http://localhost:8000/users/consent-status?agent_id=${user_id_logged}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );

        const consentData = res.data;
        this.showConsent = !consentData.consent;
      }
    },
  async mounted() {
    await this.checkConsent();
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

body,
.admin-wrapper,
.main-view {
  pointer-events: none;
}

.consent-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: all;
}

.consent-container {
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  background-color: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  padding: 20px;
  overflow-y: auto;
  backdrop-filter: blur(6px);
  z-index: 10001;
}

body,
.admin-wrapper,
.main-view {
  pointer-events: none;
}

.consent-container * {
  pointer-events: all;
}

.consent-container h2,
.consent-container h3 {
  color: #333;
}

.consent-container ul {
  margin-left: 20px;
}

.consent-container .buttons {
  margin-top: 20px;
  text-align: center;
}

.consent-container button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.consent-container button:first-child {
  background-color: #4caf50;
  color: white;
}

.consent-container button:last-child {
  background-color: #f44336;
  color: white;
}

</style>