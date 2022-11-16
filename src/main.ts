import { createSSRApp, createApp as createRegularApp } from 'vue';
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import { createHead } from '@vueuse/head';
import { installSchemaOrg } from '@vueuse/schema-org-vite/vite';

const routes = [
  {
    path: '/',
    component: () => import('./views/IndexView.vue'),
  },
];
import App from './App.vue';

export const createApp = async (isSSR = false) => {
  const head = createHead();
  const app = isSSR ? createSSRApp(App) : createRegularApp(App);
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
  app.use(router);
  app.use(head);
  installSchemaOrg(
    { app, router },
    {
      client: !isSSR,
      canonicalHost: 'https://fy-vue.com',
    }
  );
  return { app, router, head };
};
