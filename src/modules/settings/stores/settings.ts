import { ITheme } from '@/modules/settings/services/theme.ts';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    sidebarIsOpened: false as boolean,
    appTheme: null as ITheme | null,
  }),
  actions: {
    setAppTheme(theme: ITheme) {
      this.appTheme = theme;
    },
    setSidebarIsOpened(value: boolean) {
      this.sidebarIsOpened = value;
    },
  },
});
