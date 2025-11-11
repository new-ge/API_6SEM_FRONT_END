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
            
            <div class="select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.status"
                multiple
                :options="optionsStatus"
                placeholder="STATUS"
                :render-tag="null"
                clearable
                class="select"
                label-field="label"
                value-field="value"
                @update:value="(val) => toggleFilter('status', val)"
                />  
                <span class="fake-placeholder">STATUS
                  <span
                      v-if="filtros.status && filtros.status.length > 0"
                    >
                      ({{ filtros.status.length }})
                  </span>
                </span>
            </div>
            <div class="select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.sla"
                multiple
                :options="optionsSla"
                placeholder="SLA"
                :render-tag="null"
                clearable
                class="select"
                label-field="label"
                value-field="value"
                @update:value="(val) => toggleFilter('sla', val)"
                />  
                <span class="fake-placeholder">SLA
                  <span
                      v-if="filtros.sla && filtros.sla.length > 0"
                    >
                      ({{ filtros.sla.length }})
                  </span>
                </span>
            </div>
            <div class="select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.priority"
                multiple
                :options="optionsPriority"
                placeholder="Prioridade"
                :render-tag="null"
                clearable
                class="select"
                label-field="label"
                value-field="value"
                @update:value="(val) => toggleFilter('priority', val)"
                />  
                <span class="fake-placeholder">PRIORIDADES
                  <span
                      v-if="filtros.priority && filtros.priority.length > 0"
                    >
                      ({{ filtros.priority.length }})
                  </span>
                </span>
            </div>
            <div class="select-wrapper" style="position: relative;">
                <n-select
                v-model:value="filtros.sub_category"
                multiple
                :options="optionsSubCategory"
                placeholder="Subcategoria"
                :render-tag="null"
                clearable
                class="select"
                label-field="label"
                value-field="value"
                @update:value="(val) => toggleFilter('sub_category', val)"
                />  
                <span class="fake-placeholder">SUBCATEGORIA
                  <span
                      v-if="filtros.sub_category && filtros.sub_category.length > 0"
                    >
                      ({{ filtros.sub_category.length }})
                  </span>
                </span>
            </div>
            <h3 class="name-filters">FAQ</h3>
            <n-input
              v-model:value="searchText"
              placeholder="Insira a palavra chave..."
              round
              clearable
              class="search-input"
              @keyup.enter="submitQuestion"
            >
              <template #suffix>
                <n-icon :component="SearchOutline" />
              </template>
            </n-input>
            <div class="faq-box">
              <div v-for="(item, index) in results" :key="index" class="faq-item">
                <p><strong>P:</strong> {{ item.question }}</p>
                <p><strong>R:</strong> {{ item.answer }}</p>
                <hr />
              </div>

            </div>
            <div class="Aclean-filters">
              <n-button 
              color="#502A81" 
              class="standard" 
              :class="{'is-active' : isActive}" 
              :focusable="false" 
              @click="timerCleanFiltersButton">
                  Limpar Filtros
              </n-button>
            </div> 
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      isActive: false,
      filtros: {
        sla: [],
        tag: [],
        access_level: [],
        status: [],
        sub_category: [],
        priority: [],
        created_at_start: null,
        created_at_end: null
      },
      optionsStatus: [
        { label: "Aberto", value: "Aberto" },
        { label: "Em Atendimento", value: "Em Atendimento" },
        { label: "Aguardando Cliente", value: "Aguardando Cliente" },
        { label: "Resolvido", value: "Resolvido" },
        { label: "Fechado", value: "Fechado" }
      ],
      optionsSla: [
        { label: "SLA Padrão", value: { name: "SLA Padrão", target_minutes: 480 } },
        { label: "SLA VIP", value: { name: "SLA VIP", target_minutes: 240 } },
        { label: "SLA Estendido", value: { name: "SLA Estendido", target_minutes: 1440 } }
      ],
      optionsPriority: [
        { label: "Baixa", value: "Baixa" },
        { label: "Média", value: "Média" },
        { label: "Alta", value: "Alta" },
        { label: "Crítica", value: "Crítica" }
      ],
      optionsSubCategory: [
        { label: "Erro de Sistema", value: "Erro de sistema" },
        { label: "Problemas de Login", value: "Problemas de login" },
        { label: "Relatórios", value: "Relatórios" },
        { label: "Lentidão", value: "Lentidão" },
        { label: "Permissões", value: "Permissões" },
        { label: "Exportação", value: "Exportação" },
        { label: "Funcionalidade Indisponível", value: "Funcionalidade indisponível" },
        { label: "Cadastro de Usuários", value: "Cadastro de usuários" },
        { label: "Dados Inconsistentes", value: "Dados inconsistentes" }
      ],
      searchText: '',
      results: []
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
            'sentiment-volume'
        ];
        eventos.forEach(evt => this.$emit(evt, { ...this.filtros }));
    },

    cleanFilters() {
      this.filtros = {
        sla: [],
        tag: [],
        access_level: [],
        status: [],
        sub_category: [],
        priority: [],
        created_at_start: null,
        created_at_end: null
      };
      this.searchText = '';
      this.emitFilters();
    },
    
    toggleFilter(tipo, valor) {
      this.filtros[tipo] = valor;
      this.emitFilters();
    },

    timerCleanFiltersButton() {
      this.isActive = true
      this.cleanFilters()
      
      setTimeout(() => {
        this.isActive = false
      }, 500)
    },
    async submitQuestion() {
      if (!this.searchText.trim()) return;

      try {
        const authStore = useAuthStore()
        const token = authStore.token
        
        const response = await fetch(
          `http://localhost:8000/faq/search?question=${encodeURIComponent(this.searchText)}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );
        const data = await response.json();

        this.results = data.results.map(item => ({
          question: item.question,
          answer: item.answer.replace(/^,/, '').trim(),
        }));

        this.searchText = '';
      } catch (err) {
        console.error("Erro ao buscar FAQ:", err);
      }
    }
  }
}
</script>

<style scoped>
.filter-container { 
  background: white; 
  border: 2px solid #502A81; 
  border-radius: 20px; 
  width: 24%; 
  min-height: 85%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
  position: absolute; 
  top: 54%; 
  right: 62%; 
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
}

.period-title {
    position: absolute;
    left: 5%;
}

.standard:not(.is-active) {
  width: 50%;
  top: 3%;
  left: 25%;
  background-color: #502A81;
  border: 1px solid #502A81;
  box-shadow: none;
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

.standard.is-active {
  width: 50%;
  top: 3%;
  left: 25%;
  background-color: #7a49b5;
  border-color: #7a49b5;
  box-shadow: 0 0 10px rgba(122, 73, 181, 0.6);
  pointer-events: none;
}

.inputs {
    display: flex;
    position: absolute;
    top: 48%;
    left: 5%;
    right: 7%;
    gap: 4%;
    width: 90%;
}

.dropdown-filters {
    position: absolute;
    top: 12%;
    width: 90%;
    height: calc(88% - 16px);
    left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
}

.n-select {
    background-color: #502A81;
    border-radius: 8px;
    color: white;
}

.Aclean-filters {
  position: relative;
  margin-top: auto;
  display: flex;
  width: 100%;     
  padding-top: 8px;
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

.faq-box {
    flex: 1;
    background-color: #502A81;
    border-radius: 8px;
    color: white;
    padding: 12px;
    overflow-y: auto;
    min-height: 150px;
    position: relative;
    top: 1%;
} 

.n-base-select-menu .n-base-select-option.n-base-select-option--selected {
    color: #502a81 !important;
}

.n-base-select-menu .n-base-select-option .n-base-select-option__check {
    color: #502a81;
}

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

.select-wrapper .fake-placeholder {
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

.n-base-select-menu .n-base-select-option.n-base-select-option--selected.n-base-select-option--active {
    color: #502a81;
}

.n-base-select-menu .n-base-select-option .n-base-select-option__check {
    color: #502a81;
}
</style>