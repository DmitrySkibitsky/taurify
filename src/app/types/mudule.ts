import { StoreDefinition } from 'pinia';
import { RouteRecordRaw } from 'vue-router';

export type AppModule = {
  routes: RouteRecordRaw[];
  stores: StoreDefinition[];
  init: () => Promise<string>;
};
