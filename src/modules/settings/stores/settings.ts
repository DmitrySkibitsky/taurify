import { defineStore, StoreDefinition } from 'pinia';

export const useSettingsStore: StoreDefinition = defineStore('settingsStore', {
  state: () => ({
    sidebarIsOpened: false as boolean,
    isDarkMode: false as boolean,
  }),
  actions: {
    setSidebarIsOpened(value: boolean) {
      this.sidebarIsOpened = value;
    },
  },
});
