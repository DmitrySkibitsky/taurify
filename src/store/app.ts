import { defineStore, StoreDefinition } from 'pinia';

export const useAppStore: StoreDefinition = defineStore('app', {
  state: () => ({
    count: 1,
  }),
});
