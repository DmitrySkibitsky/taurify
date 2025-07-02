import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';

import { info } from '@tauri-apps/plugin-log';
import { loadModules } from './utils/loadModules';

import AppLayout from '@/app/components/AppLayout.vue';
import App from './app/App.vue';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#ededed',
          surface: '#f2f2f2',
          'surface-dim': '#e2e2e2',
          'surface-bright': '#f2f2f2',
          'on-surface': '#151515',
          outline: '#626262',
          'outline-variant': '#d7d7d7',
          primary: '#306133',
          'on-primary': '#daefdb',
          secondary: '#737f13',
          'on-secondary': '#f6f9bb',
          tertiary: '#00826b',
          'on-tertiary': '#bdfbe4',
          error: '#c01e1e',
          'on-error': '#fed8d9',
          'surface-light': '#eaeaea',
        },
        dark: false,
        variables: {
          'overlay-background': '#151515',
        },
      },
      dark: {
        colors: {
          background: '#181818',
          surface: '#0a0a0a',
          'surface-dim': '#0a0a0a',
          'surface-bright': '#2b2b2b',
          'on-surface': '#e7e7e7',
          outline: '#868686',
          'outline-variant': '#383838',
          primary: '#306133',
          'on-primary': '#bfe1c0',
          secondary: '#e3ea61',
          'on-secondary': '#4c5515',
          tertiary: '#5cecc3',
          'on-tertiary': '#01594b',
          error: '#fc9b9b',
          'on-error': '#891c1c',
          'surface-light': '#2b2b2b',
        },
        dark: true,
        variables: {
          'overlay-background': '#151515',
        },
      },
    },
  },
});
app.use(vuetify);

const enabledModules: string[] = ['user', 'settings'];
const allRoutes: RouteRecordRaw[] = [];
const modules = await loadModules(enabledModules);

allRoutes.push({
  path: '/',
  component: AppLayout,
  name: 'index',
});

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
