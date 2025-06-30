<script setup lang="ts">
  import { SETTINGS_API } from '@/modules/settings/services';
  import { ThemeEnum } from '@/modules/settings/services/theme.ts';
  import { reactive, watch } from 'vue';
  import { useTheme } from 'vuetify/framework';

  const allThemes = SETTINGS_API.theme.getThemes();

  interface IInitialState {
    theme: ThemeEnum;
  }

  const initialState: IInitialState = {
    theme: SETTINGS_API.theme.getCurrentTheme().key,
  };

  const state = reactive<IInitialState>({
    ...initialState,
  });

  const themeInstance = useTheme();

  watch(
    () => state.theme,
    (value: ThemeEnum) => {
      const theme = SETTINGS_API.theme.getThemeByKey(value);

      SETTINGS_API.theme.setTheme(themeInstance, theme);
    }
  );

  const tickLabels = {
    0: '25%',
    1: '50%',
    2: '60%',
    3: '75%',
    4: '90%',
    5: '100%',
    6: '110%',
    7: '125%',
    8: '140%',
    9: '150%',
    10: '200%',
  };
</script>

<template>
  <form>
    <VRow>
      <VCol cols="12">
        <VSelect
          v-model="state.theme"
          :items="allThemes"
          label="Theme"
          item-title="name"
          item-value="key"
        ></VSelect>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <div class="text-caption">Zoom</div>
        <v-slider
          :ticks="tickLabels"
          show-ticks="always"
          max="10"
          step="1"
          tick-size="11"
        ></v-slider>
      </VCol>
    </VRow>
  </form>
</template>
