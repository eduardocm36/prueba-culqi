import { httpClient } from "@/composables/httpClient";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loader: false,
    router: useRouter(),
    msg: "",
    authUser: {
        id: 0,
        nombre: "",
        correo: "",
        cargo: "",
        departamento: "",
        oficina: "",
        estadoCuenta: ""
    },
  }),
  actions: {
    getLocalUser() {
      const localUser = window.localStorage.getItem("authUser");
      if(localUser){
          this.authUser = {...JSON.parse(localUser)}; ;
      }
    },
    async fetchUser(form: object) {
      this.loader = true
      await httpClient.post("auth/login", form).then((response) => {
        window.localStorage.setItem("authToken", response.data.data.token);
        window.localStorage.setItem("authUser", JSON.stringify(response.data.data.user));
        this.loader = false;
        this.router.push({name: "admin.home"})
        window.scrollTo(0, 0);
      }).catch(error => {
        this.msg = error.response.data.message;
        this.loader = false;
      });
    },
    logout() {
      this.authUser = {
        id: 0,
        nombre: "",
        correo: "",
        cargo: "",
        departamento: "",
        oficina: "",
        estadoCuenta: ""
      };
      window.localStorage.removeItem("authUser");
      window.localStorage.removeItem("authToken");
      this.router.push({name: "login"})
      window.scrollTo(0, 125);
    },
  },
});
