<script setup lang="ts">
  import { MdiIcon } from '@/app/types/mdi-icons.ts';
  import { SETTINGS_API } from '@/modules/settings/services';
  import { ITheme, ThemeEnum } from '@/modules/settings/services/theme.ts';
  import { useSettingsStore } from '@/modules/settings/stores/settings.ts';
  import { ref, watch } from 'vue';
  import { useTheme } from 'vuetify/framework';

  const themeInstance = useTheme();
  const settingsStore = useSettingsStore();

  const darkTheme: ITheme = SETTINGS_API.theme.getThemeByKey(ThemeEnum.DARK);
  const lightTheme: ITheme = SETTINGS_API.theme.getThemeByKey(ThemeEnum.LIGHT);

  const getIcon = () => {
    return settingsStore.appTheme?.key === ThemeEnum.DARK
      ? lightTheme.icon
      : darkTheme.icon;
  };

  const icon = ref<MdiIcon>(getIcon());

  watch(
    () => settingsStore.appTheme,
    () => {
      icon.value = getIcon();
    }
  );
</script>

<template>
  <VDivider vertical />
  <VBtn
    class="text-none me-2 ms-2"
    height="48"
    icon
    slim
    @click="SETTINGS_API.theme.toggleTheme(themeInstance)"
  >
    <VIcon :icon="icon"></VIcon>
  </VBtn>
</template>
