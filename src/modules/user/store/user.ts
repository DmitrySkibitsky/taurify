import { defineStore, StoreDefinition } from 'pinia';

export const useUserStore: StoreDefinition = defineStore('user', {
  state: (): {
    user: {
      name: String;
    };
  } => ({
    user: {
      name: 'Test User',
    },
  }),
});
