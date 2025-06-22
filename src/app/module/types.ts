import { RouteRecordRaw } from 'vue-router';
import { StoreDefinition } from 'pinia';

export type AppModule = {
  routes: RouteRecordRaw[];
  stores: StoreDefinition[];
  init: () => Promise<string>;
};
