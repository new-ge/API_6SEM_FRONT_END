<template>
    <div class="chartTSV-container">
        <div class="chart1-card">
            <h3 class="chart1-title">Análise de Sentimento</h3>
            <Doughnut :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { onMounted, ref } from "vue";
import { Doughnut } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ["#9a7d0a", "#5b2c6f"],
      borderWidth: 0,
    },
  ],
});

const chartOptions = {
  responsive: true,
  cutout: "60%",
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#4a235a",
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    title: {
      display: false,
    },
  },
};

const fetchSentimentData = async () => {
  console.log("Iniciando fetch dos dados...");
  try {
    const response = await axios.get("http://localhost:8000/tickets/sentiment_counts");
    const data = response.data;

    const positivo = Number(data.positivo) || 0;
    const negativo = Number(data.negativo) || 0;
    const total = positivo + negativo;

    if (total === 0) {
      console.log("Sem dados disponíveis.");
      chartData.value = {
        labels: ["Sem dados"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#cccccc"],
            borderWidth: 0,
          },
        ],
      };
      return;
    }

    const positivoPercent = Math.round((positivo / total) * 100);
    const negativoPercent = Math.round((negativo / total) * 100);

    chartData.value = {
      labels: [
        `Negativo ${negativoPercent}%`,
        `Positivo ${positivoPercent}%`,
      ],
      datasets: [
        {
          data: [negativo, positivo],
          backgroundColor: ["#9a7d0a", "#5b2c6f"],
          borderWidth: 0,
        },
      ],
    };

    console.log("Dados do gráfico atualizados:", chartData.value);
  } catch (error) {
    console.error("Erro ao buscar dados de sentimento:", error);
  }
};

onMounted(fetchSentimentData);
</script>


<style>

.chartTSV-container {
    background: white;
    border: 2px solid #502A81;
    border-radius: 16px;
    width: 19.9%;
    height: 44.4%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 33.9%;
    left: 68.1%;
    transform: translate(-50%, -50%);
}

.chart1-card {
    padding: 1rem;
    text-align: center;
    position: relative;
    height: 80%;
    width: 80%;
}

.chart1-title {
    color: #502A81;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 1rem;
    left: 9%;
    top: -1%;
    font-size: 160% !important;
    position: relative
}

.chart1 {
    max-width: 250px;
    margin: 0 auto;
    position: absolute;
    top: 17%;
    left: 10%;
    height: 79% !important;
}

</style>