<script setup>
import FiltersButtons from './components/FiltersButtons.vue';
import BackgroundMain from './components/BackgroundMain.vue';
import BigNumberCards from './components/BigNumberCards.vue';
import PeriodChart from './components/PeriodChart.vue';
import naive from 'naive-ui';

</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  font-family: 'Inter', sans-serif;
  color: #502A81;
}
</style>