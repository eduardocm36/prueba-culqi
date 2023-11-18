<script setup lang="ts">
import "@/styles/login.css";
import { ref, reactive, watch } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

let msg = ref("");
let loader = ref(false)
let form = reactive({
  correo: "",
  password: "",
})

function submit() {
  loader.value = true;
  watch( () => authStore.loader, (newLoader) => {
    msg.value = authStore.msg
    loader.value = newLoader
  })
  authStore.fetchUser(form);
}

</script>

<template>
  <div class="login_container">
    <div class="conteiner_present">
      <div class="present_image">
        <img src="@/assets/Photo.svg" alt="" />
      </div>
      <div class="present_footer">
        <div class="pres_logo">
          <img src="@/assets/logo_white.svg" alt="Logo" />
        </div>
        <h2 class="pres_principal">Dale más power ⚡ a tus empleados hoy 💪</h2>
        <p class="pres_secondary">
          Te ayudamos a gestionarlos de manera más sencilla
        </p>
      </div>
    </div>
    <div class="container_login">
      <div class="container_form">
        <h2>Inicia sesión</h2>
        <form @submit.prevent="submit">
          <label for="email" class="label_login">Correo electrónico <span>*</span></label>
          <input
            v-model="form.correo"
            type="email"
            name="email"
            id="email"
            class="input_login login_input"
            :disabled="loader"
            placeholder="Ingresa el correo electrónico"/>
          <label for="password" class="label_login">Contraseña <span>*</span></label>
          <input
            v-model="form.password"
            type="password"
            name="password"
            id="password"
            :disabled="loader"
            class="input_login login_input"
            placeholder="Ingresa la contraseña"
          />
          <div v-if="msg != ''" class="login_error">
            <img src="@/assets/error.svg" alt="" />{{ msg }}
          </div>
          <input 
            type="submit"
            :value="loader ? 'Iniciando...' : 'Iniciar sesión'"
            :class="loader ? 'submit_disabled' : ''"
            class="input_login"
            :disabled="loader"/>
        </form>
        <p>¿Eres nuevo aquí? <a href="#">Crea una cuenta</a></p>
      </div>
      <p class="login_footer">© 2023 Culqi . Todos los derechos reservados</p>
    </div>
  </div>
</template>