import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const email = ref("");
  const role = ref("");

  const reset = () => {
    name.value = "";
    email.value = "";
    role.value = "";
  };

  function setUser(data) {
    name.value = data.name;
    email.value = data.email;
    role.value = data.role;
  }

  return { name, email, role, setUser, reset };
});
