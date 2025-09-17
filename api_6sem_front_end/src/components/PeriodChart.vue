<template>
  <div class="period-container">
    <div class="chart-container">
      <LineChart :data="chartData" :options="chartOptions" class="chart"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line as LineChart } from "vue-chartjs";
import { reactive } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const labels = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const chartData: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Volume",
      borderColor: "#5E2B97", 
      backgroundColor: "#5E2B97",
      data: [250, 300, 200, 150, 160, 250, 180, 140, 280, 50, 320, 400],
      tension: 0.3,
    },
    {
      label: "Tendência",
      borderColor: "#B59F3B",
      backgroundColor: "#B59F3B",
      data: [240, 290, 50, 140, 170, 180, 190, 60, 300, 310, 280, 350],
      tension: 0.3,
    },
  ],
};

const chartOptions: ChartOptions<"line"> = reactive({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "Chamados por Período",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
});
</script>

<style>
.period-container {
  background: white;
  border: 2px solid #502A81;
  border-radius: 23px;
  width: 72%;
  height: 39%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 77%;
  left: 62.5%;
  transform: translate(-50%, -50%);
}

.chart-container {
    padding: 1rem;
    height: 88%;
    width: 97%;
}

.chart {
    width: 100% !important;
    height: 100% !important; 
}
</style>
