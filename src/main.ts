import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { loadModules } from './utils/loadModules';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './app/App.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();

app.use(vuetify);
app.use(pinia);

const enabledModules: string[] = ['user', 'settings'];
const allRoutes: RouteRecordRaw[] = [];
const modules = await loadModules(enabledModules);

for (const module of modules) {
  if (module.routes) {
    for (const route of module.routes) {
      allRoutes.push(route);
    }
  }

  if (module.stores && Array.isArray(module.stores) && module.stores.length) {
    module.stores.forEach((store: any) => {
      store();
    });
  }

  if (module.init) {
    const message: string = await module.init();
    console.log(message);
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

app.use(router);

await router.isReady();

app.mount('#app');
