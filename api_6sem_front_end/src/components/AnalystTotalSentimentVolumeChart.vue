<template>
    <div class="AchartTSV-container">
        <div class="Achart1-card">
            <h3 class="Achart1-title">Análise de Sentimento</h3>
            <Doughnut :data="chartData" :options="chartOptions" class="Achart1"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface Props {
  resultPositive?: Record<string, number> | null
  resultNegative?: Record<string, number> | null
}

const props = defineProps<Props>();

const chartData = computed(() => ({
  labels: ["Positivo", "Negativo"],
  datasets: [
    {
      data: [props.resultPositive, props.resultNegative],
      backgroundColor: ["#9a7d0a", "#5b2c6f"],
      borderWidth: 0,
    }
  ],
}));

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

</script>


<style>

.AchartTSV-container {
    background: white;
    border: 2px solid #502A81;
    border-radius: 16px;
    width: 39.9%;
    height: 44.4%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 33.9%;
    left: 78.1%;
    transform: translate(-50%, -50%);
}

.Achart1-card {
    padding: 1rem;
    text-align: center;
    position: absolute;
    height: 90%;
    width: 95%;
}

.Achart1-title {
    color: #502A81;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 1rem;
    left: 25%;
    top: -3%;
    font-size: 200% !important;
    position: absolute;
}

.Achart1 {
    max-width: 60%;
    margin: 0 auto;
    position: absolute;
    top: 17%;
    left: 20%;
    height: 79% !important;
}

</style>