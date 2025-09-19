<template>
  <div class="chartMT-container">
    <h3 class="chartMT-title">Principais Temas</h3>
    <Bar :data="chartData" :options="chartOptions" class="chartMT" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = {
  labels: ["Lentidão", "Acesso", "Perfil", "Perfil", "Perfil", "Perfil"],
  datasets: [
    {
      data: [100, 80, 80, 50, 40, 30],
      backgroundColor: "#5b2c6f",
      borderRadius: 8,
      barThickness: 25,
    },
  ],
};

const chartOptions = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      ticks: {
        color: "#502A81",
        font: {
          size: 12,
          weight: "bold",
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};
</script>

<style scoped>

.chartMT-container {
    background: white;
    border: 2px solid #502A81;
    border-radius: 15px;
    width: 17.7%;
    height: 40.4%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 33.9%;
    left: 88.7%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    text-align: center;
}

.chartMT-title {
    color: #502A81;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 1rem;
    position: absolute;
    top: -0.9%;
    left: 9%;
}

.chartMT {
    width: 89% !important;
    height: 84% !important;
    position: absolute;
    top: 14%;
}

</style>
