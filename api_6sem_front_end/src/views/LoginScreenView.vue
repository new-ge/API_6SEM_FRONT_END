<template>
    <div>
        <LoginScreen @login="onLogin" />
    </div>
</template>

<script lang="js">
import LoginScreen from '@/components/LoginScreen.vue';

export default {
    name: 'LoginScreenView',
    components: {
        LoginScreen,
    },
    data() {
        return {
        }
    },
    methods: {
        async handleLogin(username, password) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/login/validate-login",
                    {
                        username: username,
                        password: password
                    }
                );

                if (data.token) {
                    return true;
                } else {
                    console.error("Login falhou:", data.error);
                    toast.error(data.error || "Login inválido");
                    return false;
                }

                console.log(data)

                return data;

            } catch (error) {
                console.error(`Erro ao fazer ${method} em ${url}:`, error);
                throw error;
            }
        },
    }
}

</script>