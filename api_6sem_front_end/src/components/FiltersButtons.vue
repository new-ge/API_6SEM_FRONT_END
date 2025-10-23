<template>
    <div class="filter-container">
        <div class="date-filters">
            <h3 class="period-title">Período</h3>
            <div class="inputs">
                <n-date-picker
                    type="date"
                    placeholder="Data inicial"
                    class="date-input"
                    :value="filtros.created_at_start"
                    @update:value="toggleFilter('created_at_start', $event)"
                    :is-date-disabled="timeToDisable"
                />
                <n-date-picker
                    type="date"
                    placeholder="Data final"
                    class="date-input"
                    :value="filtros.created_at_end"
                    @update:value="toggleFilter('created_at_end', $event)"
                    :is-date-disabled="timeToDisable"
                />
            </div>
        </div>
        <div class="dropdown-filters">
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.team"
                multiple
                :options="optionsTeam"
                placeholder="TEAM"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">TEAM</span>
            </div>
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.status"
                multiple
                :options="optionsStatus"
                placeholder="STATUS"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">STATUS</span>
            </div>
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.sla"
                multiple
                :options="optionsSla"
                placeholder="SLA"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">SLA</span>
            </div>
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.priority"
                multiple
                :options="optionsPriority"
                placeholder="Prioridade"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">PRIORIDADES</span>
            </div>
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.sub_category"
                multiple
                :options="optionsSubCategory"
                placeholder="Subcategoria"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">SUBCATEGORIA</span>
            </div>
            <div class="my-select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.tag"
                multiple
                :options="optionsTag"
                placeholder="tag"
                :render-tag="null"
                clearable
                class="my-select"
                />  
                <span class="fake-placeholder">TAG</span>
            </div>
            <div class="clean-filters">
            <n-button color="#502A81" class="standard" @click="recarregarPagina">
                Limpar Filtros
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
        team: [],
        sla: [],
        tag: [],
        access_level: [],
        status: [],
        sub_category: [],
        priority: [],
        created_at_start: null,
        created_at_end: null
      },
      optionsTeam: [
        { label: "N1", value: "N1" },
        { label: "N2", value: "N2" },
        { label: "N3", value: "N3" },
      ],
      optionsStatus: [
        { label: "Aberto", value: "aberto" },
        { label: "Em andamento", value: "andamento" },
        { label: "Aguardando Cliente", value: "aguardando" },
        { label: "Resolvido", value: "resolvido" },
        { label: "Fechado", value: "fechado" },
      ],
      optionsSla: [
        { label: "Padrão", value: "padrao" },
        { label: "VIP", value: "vip" },
        { label: "Estendido", value: "estendido" },
      ],
      optionsPriority: [
        { label: "Baixa", value: "baixa" },
        { label: "Média", value: "media" },
        { label: "Alta", value: "alta" },
        { label: "Crítica", value: "critica" }
      ],
      optionsSubCategory: [
        { label: "Erro de Sistema", value: "erro" },
        { label: "Problema de Login", value: "problema" },
        { label: "Relatórios", value: "relatorios" },
        { label: "Lentidão", value: "lentidao" },
        { label: "Permissões", value: "permissoes" },
        { label: "Exportação", value: "exportacao" },
        { label: "Funcionalidade Indisponível", value: "funcionalidade" },
        { label: "Cadastro de Usuário", value: "cadastro" },
        { label: "Dados Incosistentes", value: "dados" }
      ],
      optionsTag: [
        { label: "Urgente", value: "urgente" },
        { label: "Revisar", value: "revisar" },
        { label: "Bug", value: "bug" },
        { label: "Solicitação", value: "solicitacao" },
        { label: "Melhoria", value: "melhoria" },
        { label: "Financeiro", value: "financeiro" },
        { label: "RH", value: "rh" },
        { label: "TI", value: "ti" },
        { label: "Duplicado", value: "duplicado" },
        { label: "Acompanhamento", value: "acompanhamento" },
      ]
    }
  },

  methods: {
    timeToDisable(ts) {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return ts > today.getTime()
    },

    emitFilters() {
        const eventos = [
            'open-tickets-filter',
            'average-running-time-filter',
            'exceeded-sla-filter',
            'by-month',
            'recurring-tickets',
            'primary-themes',
            'sentiment-volume'
        ];
        eventos.forEach(evt => this.$emit(evt, { ...this.filtros }));
    },

    recarregarPagina() {
      window.location.reload()
    },


    toggleFilter(tipo, valor) {
        if (tipo === "created_at_start" || tipo === "created_at_end") {
            this.filtros[tipo] = valor;
        } else if (Array.isArray(this.filtros[tipo])) {
            if (tipo === 'sla') {
                const index = this.filtros.sla.findIndex(s => s.name === valor.name);
                if (index === -1) this.filtros.sla.push(valor);
                else this.filtros.sla.splice(index, 1);
            } else {
                const index = this.filtros[tipo].indexOf(valor);
                if (index === -1) this.filtros[tipo].push(valor);
                else this.filtros[tipo].splice(index, 1);
            }
        }
        this.emitFilters();
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
    left: 5%;
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
    width: 90%;
    gap: 4%;
}

.dropdown-filters {
    position: absolute;
    top: 12%;
    width: 90%;
    height: 31%;
    left: 5%;
    display: flex;
    flex-direction: column;
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

.n-select {
    background-color: #502A81;
    border-radius: 8px;
    color: white;
}

.standard {
    width: 50%;
    top: 3%;
    left: 25%;
    background-color: #502A81;
    border: 1px solid #502A81;
}

.Aclean-filters {
    position: relative;
    top: 1%;
    height: 6%;
}

.name-filters {
    color: #502A81;
    font-weight: bold;
    margin: 0%;
}

.n-base-selection .n-base-selection-tags{
    background-color: #502a81;
    --n-color: #502a81;
    --n-color-active: #502a81;
    --n-color-disabled: #502a81;
}

.n-base-select-menu .n-base-select-option.n-base-select-option--selected {
    color: #502a81 !important;
}

.n-base-select-menu .n-base-select-option .n-base-select-option__check {
    color: #502a81;
}

.clean-filters {
    position: relative;
    z-index: 2;
    width: 100%;
    top: 2.4%;
}
</style>

<style scoped>
::v-deep(.n-base-selection-overlay) {
  display: none;
}

::v-deep(.n-base-selection--active.n-base-selection--focus) {
  background-color: #502A81 !important;
  --n-color: #502A81 !important;
  --n-border-color: #502A81 !important;
  --n-box-shadow-focus: none !important;
}

::v-deep(.n-base-selection-tags) {
  background-color: #502A81 !important;
  color: #fff !important;
}

::v-deep(.n-base-selection-input) {
  display: none;
}

::v-deep(.n-base-selection-tag-wrapper) {
  display: none;
}

::v-deep(.n-base-selection-placeholder) {
  display: none;
}

.my-select-wrapper .fake-placeholder {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #fff;
  pointer-events: none;
}

:deep(.search-input .n-input__border) {
  border: none !important;
}

:deep(.search-input .n-input__state-border) {
  border: none !important;
  box-shadow: none !important;
}

:deep(.search-input .n-input__input-el) {
  box-shadow: none !important;
}

:deep(.search-input.n-input--focus .n-input__state-border) {
  border: none !important;
  box-shadow: none !important;
}

</style>
