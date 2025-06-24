import { ThemeInstance } from 'vuetify/lib/types.mjs';

const toggleTheme = async (theme: ThemeInstance) => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

export default {
  toggleTheme,
};
