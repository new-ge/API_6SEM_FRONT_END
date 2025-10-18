<template>
    <div class="numberCards-container">
        <div class="big-number-cards">
            <div class="card">
            <p class="label">Quantidade de Chamados</p>
            <h2 class="number">{{ resultOpened ?? 0}}</h2>
            </div>
            <div class="card">
            <p class="label">Quantidade de excedidos</p>
            <h2 class="number">{{ resultSLAExceeded ?? 0}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    resultOpened: {
      type: [Object, Number],
      default: () => null
    },
    resultSLAExceeded: {
      type: [Object, Number],
      default: () => null
    },  
  }
}
</script>

<style>

.numberCards-container {
  width: 31%;
  height: 45%;
  position: absolute;
  top: 34%;
  right: 27%;
  transform: translate(-50%, -50%);
}

.big-number-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
}

.card {
  background: #fff;
  border: 2px solid #502A81;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.label {
  font-size: 25px;
  font-weight: 600;
  color: #502A81;
  margin-bottom: 0px;
  position: relative;
  top: -5%;
}

.number {
  font-size: 40px;
  font-weight: 800;
  color: #502A81;
  margin: 0px;
  position: relative;
  top: -7%;
}

.unit {
  font-size: 16px;
  font-weight: 600;
  color: #502A81;
  margin-left: 4px;
}
</style>