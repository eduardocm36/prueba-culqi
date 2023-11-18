import { httpClient } from "@/composables/httpClient";
import { defineStore } from "pinia";

export const empleadosStore = defineStore("empleados", {

    state: () => ({
      empleados: [],
      page: 1,
      loader: true,
      totalItems: 0,
      itemsXpages: 10
    }),
    getters: {
      cantPages: state => Math.ceil(state.totalItems / state.itemsXpages),
    },
    actions: {
      async getEmpleados(itemsXpages = 10, page = 1){
        console.log("se ejecuta: ", itemsXpages)
        this.itemsXpages = itemsXpages;
        this.page = page;
        await httpClient.get(`/empleados?limit=${itemsXpages}&page=${page}`).then(response => {
          this.empleados = response.data.data;
          console.log(this.empleados)
          this.totalItems = response.data.total;
          this.loader = false
        }).catch(error => {
          console.log("Error al obtener datos")
          this.loader = true
        })
      }
    }
})