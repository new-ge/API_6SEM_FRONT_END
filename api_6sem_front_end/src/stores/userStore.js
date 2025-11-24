import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const agent_id = ref("");
  const name = ref("");
  const email = ref("");
  const role = ref("");

  const reset = () => {
    agent_id.value = "";
    name.value = "";
    email.value = "";
    role.value = "";
  };

  function setUser(data) {
    agent_id.value = data.agent_id;
    name.value = data.name;
    email.value = data.email;
    role.value = data.role;
  }

  return { name, email, role, agent_id, setUser, reset };
});
