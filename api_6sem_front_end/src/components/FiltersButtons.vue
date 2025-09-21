<template>
  <div class="filter-container">
        <div class="sla-filter">
            <h3>Período</h3>
            <div class="sla-buttons">
                <n-button color="#502A81" class="standard" :class="{ 'is-active': filtros.sla.includes('SLA Padrão') }" @click="toggleFilter ('sla', 'Sla Padrão')">
                Padrão
                </n-button>
                <n-button color="#502A81" class="vip" :class="{ 'is-active': filtros.sla.includes('SLA VIP') }" @click="toggleFilter ('sla', 'Sla VIP')">
                VIP
                </n-button>
                <n-button color="#502A81" class="extended" :class="{ 'is-active': filtros.sla.includes('SLA Estendido') }" @click="toggleFilter ('sla', 'Sla Estendido')">
                Estendido
                </n-button>
            </div>
        </div>
        <div class="team-filter">
            <div>
                <h3>Equipe</h3>
            </div>
            <div class="team-buttons">
                <n-button color="#502A81" class="analist1" :class="{ 'is-active': filtros.equipe.includes('N1') }">
                N1
                </n-button>
                <n-button color="#502A81" class="analist2" :class="{ 'is-active': filtros.equipe.includes('N2') }">
                N2
                </n-button>
                <n-button color="#502A81" class="analist3" :class="{ 'is-active': filtros.equipe.includes('N3') }">
                N3
                </n-button>
            </div>
        </div>
        <div class="status-filter">
            <h3>Status</h3>
            <div class="status-buttons">
                <n-button color="#502A81" class="open" :class="{ 'is-active': filtros.status.includes('Abertp') }">
                Aberto
                </n-button>
                <n-button color="#502A81" class="inService" :class="{ 'is-active': filtros.status.includes('Em Atendimento') }">
                Em <br> Atendimento
                </n-button>
                <n-button color="#502A81" class="waiting" :class="{ 'is-active': filtros.status.includes('Aguardando Cliente') }">
                Aguardando <br> Cliente
                </n-button>
                <n-button color="#502A81" class="resolved" :class="{ 'is-active': filtros.status.includes('Resolvido') }">
                Resolvido
                </n-button>
                <n-button color="#502A81" class="close" :class="{ 'is-active': filtros.status.includes('Fechado') }">
                Fechado
                </n-button>
            </div>
        </div>
        <div class="date-filters">
            <h3>SLA</h3>
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
        <div class="priorities-filter">
            <div>
                <h3>Prioridades</h3>
            </div>
            <div class="priorities-buttons">
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Baixa') }">
                Baixa
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Média') }">
                Média
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Alta') }">
                Alta
                </n-button>
                <n-button color="#502A81" class="priority-button" :class="{ 'is-active': filtros.priority.includes('Crítica') }">
                Crítica
                </n-button>
            </div>
        </div>
        <div class="subcategory-filter">
            <h3>SubCategoria</h3>
            <div class="subcategory-buttons">
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Erro de Sistema') }">
                Erro de <br> Sistema
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Lentidão') }">
                Lentidão
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Funcionalidade Indisponível') }">
                Funcionalidade<br> Indisponível
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Problemas de Login') }">
                Problemas<br> de Login
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Permissões') }">
                Permissões
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Cadastro de Usuários') }">
                Cadastro de<br> Usuários
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Relatórios') }">
                Relatórios
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Exportação') }">
                Exportação
                </n-button>
                <n-button color="#502A81" class="subcategory" :class="{ 'is-active': filtros.sub_category.includes('Dados Inconsistentes') }">
                Dados <br> Inconsistentes
                </n-button>
            </div>
        </div>
        <div class="tags-filter">
            <h3>TAG</h3>
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      filtros: {
        sla: [],
        tag: [],
        equipe: [],
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

    toggleFilter(tipo, valor) {
        if (Array.isArray(this.filtros[tipo])) {
            const index = this.filtros[tipo].indexOf(valor);
            if (index === -1) {
            this.filtros[tipo].push(valor);
            } else {
            this.filtros[tipo].splice(index, 1);
            }
        } else {
            this.filtros[tipo] = valor;
        }

        const filtrosToEmit = { ...this.filtros };

        if (filtrosToEmit.sla && filtrosToEmit.sla.length > 0) {
          filtrosToEmit["sla.name"] = filtrosToEmit.sla;
        }
        delete filtrosToEmit.sla;

        this.$emit("open-tickets-filter", this.filtros);
        this.$emit("average-running-time-filter", this.filtros);
        this.$emit("exceeded-sla-filter", this.filtros);
        this.$emit("by-month", this.filtros);
        this.$emit("open-tickets-filter", filtrosToEmit);
        this.$emit("average-running-time-filter", filtrosToEmit);
        this.$emit("exceeded-sla-filter", filtrosToEmit);
        this.$emit("by-month", filtrosToEmit);
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

h3 {
    width: 82%;
    left: 2%;
    position: absolute;
}

.sla-filter{
    height: 9%;
    width: 100%;
}

.sla-buttons {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: 38%;
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
    bottom: 261%;
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

.tags-filter {
    height: 31%;
    width: 100%;
    top: 70%;
    position: absolute;
}

.tags-buttons {
    position: absolute;
    display: flex;
    width: 93%;
    height: 59%;
    top: 19%;
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
    height: 18%;
    width: 36%;
    display: flex;
    position: absolute;
    flex-direction: column;
    top: 73%;
    left: 32%;
}
</style>
