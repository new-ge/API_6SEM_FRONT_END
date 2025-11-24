<template>
  <div class="consent-container">
    <h2>Termo de Consentimento para Tratamento de Dados Pessoais</h2>
    
    <p>Este termo descreve como os seus dados pessoais serão tratados conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).</p>

    <h3>1. Dados coletados</h3>
    <ul>
      <li>Nome completo</li>
      <li>Endereço de e-mail</li>
      <li>Nível de acesso</li>
    </ul>

    <h3>2. Finalidade da coleta</h3>
    <ul>
      <li>Criar e gerenciar sua conta de acesso ao dashboard;</li>
      <li>Identificar o usuário dentro da plataforma;</li>
      <li>Definir permissões e níveis de acesso;</li>
      <li>Permitir o acompanhamento de tickets e registros operacionais.</li>
    </ul>
    <p>Não utilizamos seus dados para fins comerciais, marketing ou compartilhamento com terceiros não autorizados.</p>

    <h3>3. Compartilhamento de dados</h3>
    <p>Os dados poderão ser compartilhados apenas quando necessário para:</p>
    <ul>
      <li>Cumprimento de obrigações legais;</li>
      <li>Suporte técnico ou manutenção da plataforma, sempre sob acordo de confidencialidade.</li>
    </ul>
    <p>Não haverá venda ou repasse de informações a terceiros.</p>

    <h3>4. Armazenamento e segurança</h3>
    <p>Os dados são armazenados em ambiente seguro, com medidas técnicas e administrativas para prevenção de acessos não autorizados, perdas, destruição ou vazamentos.</p>

    <h3>5. Direitos do titular</h3>
    <ul>
      <li>Solicitar acesso aos seus dados;</li>
      <li>Solicitar correção ou atualização;</li>
      <li>Solicitar exclusão, quando aplicável;</li>
      <li>Revogar este consentimento;</li>
      <li>Solicitar informações sobre uso, compartilhamento e armazenamento.</li>
    </ul>
    <p>Para exercer seus direitos, entre em contato pelo e-mail: <strong>new.ge@gmail.com</strong>.</p>

    <h3>6. Consentimento</h3>
    <p>Ao aceitar este termo, você declara estar ciente e de acordo com o tratamento dos seus dados pessoais conforme descrito acima, exclusivamente para utilização do dashboard e acompanhamento de tickets.</p>

    <div class="buttons">
      <button @click="handleConsent(true)">Confirmar</button>
      <button @click="handleConsent(false)">Rejeitar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["agent_id"],
  emits: ["term"],
  methods: {
    handleConsent(status) {
      this.$emit("term", { agent_id: this.agent_id, consent: status });
    }
  }
}
</script>

<style scoped>
.consent-container {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  background-color: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h2, h3 {
  color: #333;
}

ul {
  margin-left: 20px;
}

.buttons {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background-color: #4caf50;
  color: white;
}

button:last-child {
  background-color: #f44336;
  color: white;
}
</style>