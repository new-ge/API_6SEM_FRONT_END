<template>
    <div class="chartTSV-container">
        <div class="chart1-card">
            <h3 class="chart1-title">Análise de Sentimento</h3>
            <Doughnut :data="chartData" :options="chartOptions" class="chart1"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
  labels: ["Negativo 23%", "Positivo 77%"],
  datasets: [
    {
      data: [23, 77],
      backgroundColor: ["#9a7d0a", "#5b2c6f"],
      borderWidth: 0,
    },
  ],
};

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
    position: absolute;
    height: 90%;
    width: 89%;
}

.chart1-title {
    color: #502A81;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 1rem;
    left: 9%;
    top: -1%;
    font-size: 160% !important;
    position: absolute;
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