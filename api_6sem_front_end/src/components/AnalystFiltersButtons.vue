<template>
    <div class="filter-container">
        <div class="clean-filters">
            <n-button color="#502A81" class="standard" @click="limparTodosFiltros">
            Limpar Filtros
            </n-button>
        </div> 
  </div>
    
</template>

<script>

</script>

<style>

.filter-container {
    background: white;
    border: 2px solid #502A81;
    border-radius: 20px;
    width: 24%;
    height: 85%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 54%;
    right: 62%;
    transform: translate(-50%, -50%);
}

.standard {
    width: 28%;
    left: 5%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.clean-filters {
    position: absolute;
    z-index: 2;
    width: 117%;
    bottom: 104.4%;
    left: 81%;
}

</style>
