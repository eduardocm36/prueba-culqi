<script setup lang="ts">
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore()
const menu = [
  { to: "admin.empleados", title: "Empleados", icon:"group" },
  { to: "admin.reclutados", title: "Reclutamiento", icon:"enterprise" },
]
authStore.getLocalUser()
let user = authStore.authUser;

const logout = () => {
  authStore.logout()
}

</script>

<template>
  <div class="flex flex-row w-full min-h-screen">
    <div class="flex flex-col min-h-full w-[20%] border-solid border border-[#E9EAEC] px-8 py-6">
      <div class="flex flex-col w-full">
        <div class="py-2 mb-6">
          <img src="@/assets/logo_admin.svg" alt="Logo Culqi" class="mx-auto" />
        </div>
        <router-link 
        v-for="option, i in menu"
        :key="i"
        :to="{ name: option.to }">
        <div class="flex items-center py-4 text-sm font-bold text-primario">
          <span class="material-symbols-outlined p-0.5 mr-2.5"
            >{{ option.icon }}</span>
          {{ option.title}}
        </div> 
         </router-link>
      </div>
      <button class="border-[2px] border-solid border-primario rounded-[10px] py-[12px] mt-auto font-bold" 
        @click="logout()">Salir</button>
    </div>
    <div class="w-[80%] h-full">
      <div class="flex justify-end p-8 border-solid border border-[#E9EAEC]">
        <div class="rounded-full bg-[#EB6F25] p-1.5 text-white mr-2">{{ "CQ" }}</div>
        <div class="flex items-center font-bold text-sm">{{ user.nombre }}</div>
      </div>
      <div class="h-full w-full px-6 py-8 bg-[#F8F8F8]">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
