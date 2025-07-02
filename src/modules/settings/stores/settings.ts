import { ITheme } from '@/modules/settings/services/theme.ts';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    sidebarIsOpened: true as boolean,
    appTheme: null as ITheme | null,
    zoomValue: 1 as number,
  }),
  actions: {
    setAppTheme(theme: ITheme): void {
      this.appTheme = theme;
    },
    setSidebarIsOpened(value: boolean): void {
      this.sidebarIsOpened = value;
    },
    setZoomValue(value: number): void {
      this.zoomValue = value;
    },
  },
});
