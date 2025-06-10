import { defineStore, StoreDefinition } from 'pinia';

export const useSettingsStore: StoreDefinition = defineStore('settings', {
  state: (): {
    enabled: boolean;
  } => ({
    enabled: true,
  }),
});
