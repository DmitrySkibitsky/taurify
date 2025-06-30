import { useSettingsStore } from '@/modules/settings/stores/settings.ts';
import { ThemeInstance } from 'vuetify/lib/types.mjs';

export const enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITheme {
  key: ThemeEnum;
  name: string;
}

export class ThemeService {
  #themes: ITheme[] = [
    {
      key: ThemeEnum.LIGHT,
      name: 'Light',
    },
    {
      key: ThemeEnum.DARK,
      name: 'Dark',
    },
  ];

  public getThemes(): ITheme[] {
    return this.#themes;
  }

  public getThemeByKey(key: ThemeEnum): ITheme {
    return this.#themes.find((item: ITheme) => {
      return item.key === key;
    })!;
  }

  public getCurrentTheme(): ITheme {
    const settingsStore = useSettingsStore();

    let theme: ITheme | null = settingsStore.appTheme;

    if (theme === null) {
      theme = this.#themes.find((item: ITheme) => {
        return item.key === ThemeEnum.DARK;
      })!;

      settingsStore.setAppTheme(theme);
    }

    return theme;
  }

  public async toggleTheme(themeInstance: ThemeInstance): Promise<void> {
    const isDark = themeInstance.global.current.value.dark;
    themeInstance.global.name.value = isDark ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  }

  public setTheme(themeInstance: ThemeInstance, theme: ITheme): void {
    themeInstance.global.name.value = theme.key;

    const settingsStore = useSettingsStore();
    settingsStore.setAppTheme(theme);
  }
}

export default new ThemeService();
