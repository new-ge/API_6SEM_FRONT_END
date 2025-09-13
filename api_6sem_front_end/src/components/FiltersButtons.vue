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
        <div class="team-filter">
            <div>
                <h3>Equipe</h3>
            </div>
            <div class="team-buttons">
                <n-button color="#502A81" class="analist1">
                N1
                </n-button>
                <n-button color="#502A81" class="analist2">
                N2
                </n-button> 
                <n-button color="#502A81" class="analist3">
                N3
                </n-button>
            </div>
        </div>
        <div class="status-filter">
            <h3>Status</h3>
            <div class="status-buttons">
                <n-button color="#502A81" class="open">
                Aberto
                </n-button>
                <n-button color="#502A81" class="inService">
                Em <br> Atendimento
                </n-button> 
                <n-button color="#502A81" class="waiting">
                Aguardando <br> Cliente
                </n-button>
                <n-button color="#502A81" class="resolved">
                Resolvido
                </n-button> 
                <n-button color="#502A81" class="close">
                Fechado
                </n-button>
            </div>
        </div>
        <div class="date-filters">
            <h3>Período</h3>
            <div class="inputs">
            <n-date-picker
                type="date"
                placeholder="Data inicial"
                class="date-input"
            />
            <n-date-picker
                type="date"
                placeholder="Data final"
                class="date-input"
            />
            </div>
        </div>
        <div class="priorities-filter">
            <div>
                <h3>Prioridades</h3>
            </div>
            <div class="priorities-buttons">
                <n-button color="#502A81" class="priority-button">
                Baixa
                </n-button>
                <n-button color="#502A81" class="priority-button">
                Média
                </n-button> 
                <n-button color="#502A81" class="priority-button">
                Alta
                </n-button>
                <n-button color="#502A81" class="priority-button">
                Crítica
                </n-button>
            </div>
        </div>
        <div class="subcategory-filter">
            <h3>SubCategoria</h3>
            <div class="subcategory-buttons">
                <n-button color="#502A81" class="subcategory">
                Erro de <br> Sistema
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Lentidão
                </n-button> 
                <n-button color="#502A81" class="subcategory">
                Funcionalidade<br> Indisponível
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Problemas<br> de Login
                </n-button> 
                <n-button color="#502A81" class="subcategory">
                Permissões
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Cadastro de<br> Usuários
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Relatórios
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Exportação
                </n-button>
                <n-button color="#502A81" class="subcategory">
                Dados <br> Inconsistentes
                </n-button>
            </div>
        </div>
  </div>
</template>

<script>
import { NDatePicker } from "naive-ui";

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
    height: 9%;
    width: 100%;
}

.sla-buttons {
    position: absolute;
    width: 100%;
    top: 6%;
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

.team-filter{
    height: 9%;
    width: 100%;
}

.team-buttons {
    position: absolute;
    width: 100%;
    height: 5%;
    top: 15%;
}

.analist1 {
    width: 28%;
    left: 5%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.analist2 {
    width: 28%;
    left: 7%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.analist3 {
    width: 28%;
    left: 9%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.status-filter{
    height: 13%;
    width: 100%;
}

.status-buttons {
    position: absolute;
    width: 100%;
    height: 5%;
    top: 24%;
}

.open {
    width: 28%;
    left: 5%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.inService {
    width: 28%;
    left: 7%;
    top:-21%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.waiting {
    width: 28%;
    left: 9%;
    top:-21%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.resolved {
    width: 28%;
    left: 20%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.close {
    width: 28%;
    left: 22%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.date-filters {
    top: 32%;
    height: 13%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.inputs {
    display: flex;
    position: absolute;
    top: 46%;
    left: 5%;
    right: 7%;
    gap: 4%;
}

.n-input .n-input-wrapper {
    overflow: hidden;
    display: inline-flex;
    flex-grow: 1;
    position: relative;
    padding-left: var(--n-padding-left);
    padding-right: var(--n-padding-right);
    background-color: #502A81;
    border-radius: 4px;
}

.n-input .n-input__input-el, .n-input .n-input__textarea-el {
    -webkit-appearance: none;
    scrollbar-width: none;
    width: 100%;
    min-width: 0;
    text-decoration-color: rgb(246 247 247);
    color: rgb(255 255 255);
    caret-color: var(--n-caret-color);
    background-color: transparent;
}

.priorities-filter{
    height: 35%;
    width: 100%;
    top: 41%;
    position: absolute;
}

.priorities-buttons {
    display: flex;
    position: absolute;
    width: 88%;
    height: 13%;
    top: 17%;
    left: 5%;
    flex-direction: row;
    justify-content: space-between;
}

.priority-button {
    width: 23%;
}

.subcategory-filter {
    height: 26%;
    width: 100%;
    top: 50%;
    position: absolute;
}

.subcategory-buttons {
    position: absolute;
    display: flex;
    width: 93%;
    height: 68%;
    top: 23%;
    flex-wrap: wrap;
    gap: 2%;
    align-items: baseline;
    right: 5%;
    flex-direction: column;
}

.subcategory {
    height: 28%;
    width: 33%;
}
</style>