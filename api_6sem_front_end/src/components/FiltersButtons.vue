<template>
  <div class="filter-container">
    <div class="sla-filter">
        <h3>SLA</h3>
        <div class="sla-buttons">
            <n-button color="#502A81" class="standard">
            Padrão
            </n-button>
            <n-button color="#502A81" class="vip">
            VIP
            </n-button> 
            <n-button color="#502A81" class="extended">
            Estendido
            </n-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FiltersButtons",
};
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

h3 {
    width: 82%;
    left: 5%;
    position: absolute;
}

.sla-filter{
    height: 13%;
    width: 100%;
}

.sla-buttons {
    position: absolute;
    width: 100%;
    height: 5%;
    top: 7%;
}

.standard {
    width: 28%;
    left: 5%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.vip {
    width: 28%;
    left: 7%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.extended {
    width: 28%;
    left: 9%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

</style>