<template>
    <div class="filter-container">
        <div class="date-filters">
            <h3 class="period-title">Período</h3>
            <div class="inputs">
            <n-date-picker
                type="date"
                placeholder="Data inicial"
                class="date-input"
                v-model="filtros.created_at_start"
                @update:value="toggleFilter('created_at_start', $event)"
                :is-date-disabled="timeToDisable"
            />
            <n-date-picker
                type="date"
                placeholder="Data final"
                class="date-input"
                v-model="filtros.created_at_end"
                @update:value="toggleFilter('created_at_end', $event)"
                :is-date-disabled="timeToDisable"
            />
            </div>
        </div>
        <div class="team-filter">
            <div>
                <h3 class="team-text">Equipe</h3>
            </div>
            <div class="team-buttons">
                <n-button color="#502A81" class="analist1" :class="{ 'is-active': filtros.access_level.includes('N1') }" @click="toggleFilter('access_level', 'N1')">
                N1
                </n-button>
                <n-button color="#502A81" class="analist2" :class="{ 'is-active': filtros.access_level.includes('N2') }" @click="toggleFilter('access_level', 'N2')">
                N2
                </n-button>
                <n-button color="#502A81" class="analist3" :class="{ 'is-active': filtros.access_level.includes('N3') }" @click="toggleFilter('access_level', 'N3')">
                N3
                </n-button>
            </div>
        </div>
        <div class="status-filter">
            <h3 class="status-text">Status</h3>
            <div class="status-buttons">
                <n-button color="#502A81" class="open" :class="{ 'is-active': filtros.status.includes('Aberto') }" @click="toggleFilter('status', 'Aberto')">
                Aberto
                </n-button>
                <n-button color="#502A81" class="inService" :class="{ 'is-active': filtros.status.includes('Em Atendimento') }" @click="toggleFilter('status', 'Em Atendimento')">
                Em <br> Atendimento
                </n-button>
                <n-button color="#502A81" class="waiting" :class="{ 'is-active': filtros.status.includes('Aguardando Cliente') }" @click="toggleFilter('status', 'Aguardando Cliente')">
                Aguardando <br> Cliente
                </n-button>
                <n-button color="#502A81" class="resolved" :class="{ 'is-active': filtros.status.includes('Resolvido') }" @click="toggleFilter('status', 'Resolvido')">
                Resolvido
                </n-button>
                <n-button color="#502A81" class="close" :class="{ 'is-active': filtros.status.includes('Fechado') }" @click="toggleFilter('status', 'Fechado')">
                Fechado
                </n-button>
            </div>
        </div>
        <div class="sla-filter">
            <h3 class="sla-text">SLA</h3>
            <div class="sla-buttons">
                <n-button color="#502A81" class="standard" :class="{ 'is-active': filtros.sla.some(s => s.name === 'SLA Padrão')}" @click="toggleFilter ('sla', { name: 'SLA Padrão', target_minutes: 480 })">
                Padrão
                </n-button>
                <n-button color="#502A81" class="vip" :class="{ 'is-active': filtros.sla.some(s => s.name === 'SLA VIP') }" @click="toggleFilter ('sla', { name: 'SLA VIP', target_minutes: 240 })">
                VIP
                </n-button>
                <n-button color="#502A81" class="extended" :class="{ 'is-active': filtros.sla.some(s => s.name === 'SLA Estendido') }" @click="toggleFilter ('sla', { name: 'SLA Estendido', target_minutes: 1440 })">
                Estendido
                </n-button>
            </div>
        </div>
        <div class="priorities-filter">
            <div>
                <h3 class="priorities-text">Prioridades</h3>
            </div>
            <div class="priorities-buttons">
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Baixa') }" @click="toggleFilter('priority', 'Baixa')">
                Baixa
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Média') }" @click="toggleFilter('priority', 'Média')">
                Média
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Alta') }" @click="toggleFilter('priority', 'Alta')">
                Alta
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Crítica') }" @click="toggleFilter('priority', 'Crítica')">
                Crítica
                </n-button>
            </div>
        </div>
        <div class="subcategory-filter">
            <h3 class="subcategory-text">SubCategoria</h3>
            <div class="subcategory-buttons">
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Erro de sistema') }" @click="toggleFilter('sub_category', 'Erro de sistema')">
                Erro de <br> Sistema
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Lentidão') }" @click="toggleFilter('sub_category', 'Lentidão')">
                Lentidão
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Funcionalidade indisponível') }" @click="toggleFilter('sub_category', 'Funcionalidade indisponível')">
                Funcionalidade<br> Indisponível
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Problemas de login') }" @click="toggleFilter('sub_category', 'Problemas de login')">
                Problemas<br> de Login
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Permissões') }" @click="toggleFilter('sub_category', 'Permissões')">
                Permissões
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Cadastro de usuários') }" @click="toggleFilter('sub_category', 'Cadastro de usuários')">
                Cadastro de<br> Usuários
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Relatórios') }" @click="toggleFilter('sub_category', 'Relatórios')">
                Relatórios
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Exportação') }" @click="toggleFilter('sub_category', 'Exportação')">
                Exportação
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Dados inconsistentes') }" @click="toggleFilter('sub_category', 'Dados inconsistentes')">
                Dados <br> Inconsistentes
                </n-button>
            </div>
        </div>
        <div class="tags-filter">
            <h3 class="tag-text">TAG</h3>
            <div class="tags-buttons">
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Urgente') }" @click="toggleFilter('tag', 'Urgente')">
                Urgente
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Revisar') }" @click="toggleFilter('tag', 'Revisar')">
                Revisar
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Bug') }" @click="toggleFilter('tag', 'Bug')">
                Bug
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Solicitação') }" @click="toggleFilter('tag', 'Solicitação')">
                Solicitação
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Melhoria') }" @click="toggleFilter('tag', 'Melhoria')">
                Melhoria
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Financeiro') }" @click="toggleFilter('tag', 'Financeiro')">
                Financeiro
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('RH') }" @click="toggleFilter('tag', 'RH')">
                RH
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('TI') }" @click="toggleFilter('tag', 'TI')">
                TI
                </n-button>
                <n-button color="#502A81" class="tags" :class="{ 'is-active': filtros.tag.includes('Duplicado') }" @click="toggleFilter('tag', 'Duplicado')">
                Duplicado
                </n-button>
            </div>
            <div>
                <n-button color="#502A81" class="tag-ac" :class="{ 'is-active': filtros.tag.includes('Acompanhamento') }" @click="toggleFilter('tag', 'Acompanhamento')">
                Acompanhamento
                </n-button>
            </div>
        </div>
        <div class="clean-filters">
            <n-button color="#502A81" class="standard" @click="limparFiltros">
            Limpar Filtros
            </n-button>
        </div> 
  </div>
    
</template>

<script>

export default {
  data() {
    return {
      filtros: {
        sla: [],
        tag: [],
        access_level: [],
        status: [],
        sub_category: [],
        priority: [],
        created_at_start: null,
        created_at_end: null
      }
    }
  },
  methods: {
    timeToDisable(ts) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return ts > today.getTime()
        },

        limparFiltros() {
        
        window.location.reload()
        },

    toggleFilter(tipo, valor) {
    if (!Array.isArray(this.filtros[tipo])) return;

    if (tipo === 'sla') {
        const index = this.filtros.sla.findIndex(s => s.name === valor.name);
        if (index === -1) this.filtros.sla.push(valor);
        else this.filtros.sla.splice(index, 1);
    } else {
        const index = this.filtros[tipo].indexOf(valor);
        if (index === -1) this.filtros[tipo].push(valor);
        else this.filtros[tipo].splice(index, 1);
    }

    const eventos = ['open-tickets-filter', 'average-running-time-filter', 'exceeded-sla-filter', 'by-month', 'recurring-tickets', 'by-team'];
    eventos.forEach(evt => this.$emit(evt, { ...this.filtros }));
    }
  }
}

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

.period-title {
    position: absolute;
    left: 3%;
}

.date-filters {
    top: 0%;
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
    top: 48%;
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

.team-filter {
    height: 10%;
    width: 100%;
    position: absolute;
    top: 14%;
}

.team-text {
    position: absolute;
    left: 3%;
    bottom: 62%;
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

.status-filter {
    position: absolute;
    height: 15%;
    width: 100%;
    top: 21%;
}

.status-text {
    position: absolute;
    left: 3%;
    bottom: 58%;
}

.status-buttons {
    position: absolute;
    width: 100%;
    height: 34%;
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

.n-button .n-button__content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    min-width: 0;
    justify-content: center;
}

.sla-filter {
    position: absolute;
    bottom: 55.1%;
    height: 10%;
    width: 100%;
}

.sla-text {
    position: absolute;
    left: 3%;
    bottom: 33%;
}

.sla-buttons {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 40%;
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

.n-button--ghost {
  background-color: #502A81 !important;
  box-shadow: none !important;
}

.n-button:active,
.n-button:focus {
  background-color: #502A81 !important;
}

.n-button.is-active {
  background-color: #6b5b7f !important;
  border-color: #6b5b7f !important;
}

.extended {
    width: 28%;
    left: 9%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.priorities-filter {
    height: 13%;
    width: 100%;
    top: 44.2%;
    position: absolute;
}

.priorities-text {
    position: absolute;
    left: 3%;
    bottom: 49%;
}

.priorities-buttons {
    display: flex;
    position: absolute;
    width: 88%;
    height: 37%;
    top: 29%;
    left: 5%;
    flex-direction: row;
    justify-content: space-between;
}

.priority-button {
    width: 23%;
}

.subcategory-filter {
    height: 21%;
    width: 100%;
    top: 53%;
    position: absolute;
}

.subcategory-text {
    position: absolute;
    left: 3%;
    bottom: 66%;
}

.subcategory-buttons {
    position: absolute;
    display: flex;
    width: 93%;
    height: 88%;
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

.tags-filter {
    height: 26%;
    width: 100%;
    top: 74%;
    position: absolute;
}

.tag-text {
    position: absolute;
    left: 3%;
    bottom: 73%;
}

.tags-buttons {
    position: absolute;
    display: flex;
    width: 93%;
    height: 62%;
    top: 18%;
    flex-wrap: wrap;
    gap: 2%;
    align-items: baseline;
    right: 5%;
    flex-direction: column;
}

.tags {
    height: 28%;
    width: 33%;
}

.tag-ac {
    height: 19%;
    width: 36%;
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 74%;
    left: 32%;
}

.clean-filters {
    position: absolute;
    z-index: 2;
    width: 117%;
    bottom: 104.4%;
    left: 81%;
}
</style>
