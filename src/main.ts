import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { axiosInterceptor } from './config/axios.interceptor'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

axiosInterceptor();

const pinia = createPinia();
const app = createApp(App);


app.use(router);
app.use(vuetify);
app.use(pinia);
app.mount('#app');
