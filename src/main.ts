import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import './styles/index.css';
import './styles/globals.css';

import { info } from '@tauri-apps/plugin-log';
import { loadModules } from './utils/loadModules';

import App from './app/App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const enabledModules: string[] = ['user', 'settings'];
const allRoutes: RouteRecordRaw[] = [];
const modules = await loadModules(enabledModules);

for (const module of modules) {
  for (const route of module.routes) {
    allRoutes.push(route);
  }

  module.stores.forEach((store: Function) => {
    store();
  });

  const message: string = await module.init();

  await info(message);
}

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

app.use(router);

await router.isReady();

app.mount('#app');
