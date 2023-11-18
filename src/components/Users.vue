<script setup lang="ts">
import { onMounted, watch, reactive, ref, onUpdated } from "vue";
import { empleadosStore } from "../store/empleados";

const useEmpleadosStore = empleadosStore();

const options = [
  "UI UX Designer",
  "Graphic Designer",
  "Finance",
  "Project Manager",
  "Creative Director",
  "Lead Designer",
  "IT Support",
  "3D Designer",
];
let select = ref(false);
let selectPages = ref(false);
let loader = ref(true);
const itemsXpages = ref(useEmpleadosStore.itemsXpages);
let page = ref(1);
let empleados = reactive([]);
let cargo = ref("");

watch( () => itemsXpages.value, (newItemsXpages) => {
  useEmpleadosStore.getEmpleados(newItemsXpages);
  empleados = useEmpleadosStore.empleados;
})

onMounted(() => {
  useEmpleadosStore.getEmpleados();
  watch(
    () => useEmpleadosStore.empleados,
    (newEmpleados) => {
      empleados = newEmpleados;
      loader.value = useEmpleadosStore.loader;
    }
  );
});
</script>

<template>
  <div ref="el" class="rounded-2xl bg-white p-6">
    <div class="flex flex-row justify-between mb-6">
      <div class="flex-col">
        <h2 class="text-2xl font-bold text-primario mb-2">Empleados</h2>
        <p v-if="!loader" class="text-sm text-[#687588]">
          Gestiona tus empleados
        </p>
      </div>
      <div v-if="!loader" class="h-full flex flex-row">
        <button class="py-4 px-6 mr-5 border-primario border rounded-[10px] text-primario font-bold flex items-center">
          <span class="material-symbols-outlined">download</span>
          Descargar
        </button>
        <button class="py-4 px-6 bg-primario border-primario border text-white rounded-[10px] font-bold flex items-center">
          <span class="material-symbols-outlined mr-2">add</span>
          Nuevo
        </button>
      </div>
      <div v-else class="w-[150px]">
        <v-skeleton-loader type="chip"></v-skeleton-loader>
      </div>
    </div>
    <div v-if="!loader" class="flex relative mb-6">
      <div class="p-4 flex items-center border border-[#E9EAEC] rounded-[10px] w-[70%] mr-4">
        <input
          type="text"
          placeholder="Buscar empleado"
          class="mr-2.5 w-full outline-0"
        />
        <span class="material-symbols-outlined">search</span>
      </div>
      <div
        @click="!select ? (select = true) : (select = false)"
        class="w-[30%] flex-col relative right-0">
        <div
          class="border border-[#E9EAEC] rounded-[10px] w-full p-4 flex items-center justify-between">
          {{ cargo ? cargo : "Nombre de cargo" }}
          <span class="material-symbols-outlined">
            {{ select ? "expand_less" : "expand_more" }}</span>
        </div>
        <ul
          v-if="select"
          class="shadow-md rounded-[10px] mt-0.5 overflow-hidden bg-white absolute w-full">
          <li
            v-for="(option, i) in options"
            :key="i"
            @click="cargo = option"
            class="hover:bg-[#F8F8F8] hover:text-primario py-0.5 px-4 cursor-pointer">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="w-full mb-6 flex flex-row">
      <v-skeleton-loader type="heading" class="w-4/12"></v-skeleton-loader>
      <v-skeleton-loader type="heading" class="w-4/12"></v-skeleton-loader>
      <v-skeleton-loader type="heading" class="w-4/12"></v-skeleton-loader>
    </div>
    <div v-if="!loader">
      <div class="w-full mb-6">
        <table class="w-full">
          <thead>
            <tr class="bg-[#FAFAFA]">
              <th class="p-4 text-xs text-left text-[#687588]">Nombre</th>
              <th class="p-4 text-xs text-left text-[#687588]">Nombre cargo</th>
              <th class="p-4 text-xs text-left text-[#687588]">Departamento</th>
              <th class="p-4 text-xs text-left text-[#687588]">Oficina</th>
              <th class="p-4 text-xs text-left text-[#687588]">Cuenta</th>
              <th class="p-4 text-xs text-right text-[#687588]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(empleado, i) in empleados" :key="i">
              <td class="p-4 text-medium text-xs flex flex-col text-left border-b border-[#F1F2F4]">
                <div class="font-medium">{{ empleado["nombre"] }}</div>
                <span class="text-[10px] text-[#A0AEC0]">{{ empleado["correo"] }}</span>
              </td>
              <td class="p-4 text-normal text-xs text-left border-b border-[#F1F2F4]">
                <div>{{ empleado["cargo"] }}</div>
              </td>
              <td class="p-4 text-normal text-xs text-left border-b border-[#F1F2F4]">
                <p>{{ empleado["departamento"] }}</p>
              </td>
              <td class="p-4 text-normal text-xs text-left border-b border-[#F1F2F4]">
                <p>{{ empleado["oficina"] }}</p>
              </td>
              <td class="p-4 text-normal text-xs text-left border-b border-[#F1F2F4]">
                <p>{{ empleado["estadoCuenta"] }}</p>
              </td>
              <td class="p-4 text-normal text-xs text-left border-b border-[#F1F2F4] flex justify-end">
                <div class="h-[55px]  flex items-center">
                  <button
                    class="text-white rounded-lg px-2 py-1 bg-[#27A376] mr-2.5 flex items-center"
                    @click="console.log('objeto Visible')">
                    <span class="material-symbols-outlined text-base"
                      >visibility</span>
                  </button>
                  <button
                    class="text-white rounded-lg px-2 py-1 bg-[#2F78EE] mr-2.5"
                    @click="console.log('objeto Visible')">
                    <span class="material-symbols-outlined text-base"
                      >edit</span>
                  </button>
                  <button
                    class="text-white rounded-lg px-2 py-1 bg-[#E03137]"
                    @click="console.log('objeto Visible')">
                    <span class="material-symbols-outlined text-base"
                      >delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full flex justify-between">
        <div class="flex flex-row">
          <button
            class="text-primario rounded-lg px-1 border border-[#F1F2F4] rounded-lg mr-6 flex items-center"
            :disabled="page == 1 ? true : false">
            <span class="material-symbols-outlined"
              >chevron_left</span>
          </button>
          <div class="flex flex-row mr-6">
            <button
              v-for="i in useEmpleadosStore.cantPages"
              :key="i"
              class="text-primario rounded-lg px-3.5 py-1 border border-[#F1F2F4] rounded-lg"
              :disabled="page == 1 ? true : false"
              @click="console.log('objeto Visible')">
              {{ i }}
            </button>
          </div>
          <button
            class="text-primario rounded-lg px-1  border border-[#F1F2F4] rounded-lg  flex flex items-center"
            @click="console.log('objeto Visible')">
            <span class="material-symbols-outlined"
              >chevron_right</span>
          </button>
        </div>
        <div class="relative flex flex-row items-center text-sm">
          <p class="text-[#687588] mr-4">Mostrando 1 a 8 de 50 registros</p>
          <div
            @click="!selectPages ? (selectPages = true) : (selectPages = false)"
            class="max-w-[130px] flex-col relative">
            <ul v-if="selectPages"
              class="shadow-md w-full rounded-[10px] mb-0.5 overflow-hidden bg-white absolute bottom-[100%]">
              <li
                @click="itemsXpages = useEmpleadosStore.totalItems"
                class="hover:bg-[#F8F8F8] hover:text-primario py-0.5 px-4 cursor-pointer">
                Todos
              </li>
              <li
                @click="itemsXpages = 20"
                class="hover:bg-[#F8F8F8] hover:text-primario py-0.5 px-4 cursor-pointer">
                20
              </li>
              <li
                @click="itemsXpages = 15"
                class="hover:bg-[#F8F8F8] hover:text-primario py-0.5 px-4 cursor-pointer">
                15
              </li>
              <li
                @click="itemsXpages = 10"
                class="hover:bg-[#F8F8F8] hover:text-primario py-0.5 px-4 cursor-pointer">
                10
              </li>
            </ul>
            <div
              class="border border-[#E9EAEC] rounded-[10px] w-full px-2 py-1 flex 
              items-center justify-between cursor-pointer bg-white">
              {{ "Mostrar " + useEmpleadosStore.itemsXpages }}
              <span class="material-symbols-outlined ml-0.5">
                {{ !selectPages ? "expand_less" : "expand_more" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full mb-6">
      <table class="w-full">
        <thead>
          <tr class="bg-[#FAFAFA]">
            <th v-for="i in 6" :key="i" class="w-2/12">
              <v-skeleton-loader
                type="heading"
                color="transparent"
              ></v-skeleton-loader>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 8" :key="i">
            <td class="border-b border-[#F1F2F4] w-2/12">
              <v-skeleton-loader
                type="sentences"
                color="transparent"
              ></v-skeleton-loader>
            </td>
            <td
              v-for="i in 5"
              :key="i"
              class="border-b border-[#F1F2F4] w-2/12"
            >
              <v-skeleton-loader
                type="list-item"
                color="transparent"
              ></v-skeleton-loader>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
