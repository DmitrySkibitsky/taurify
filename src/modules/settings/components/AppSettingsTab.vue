<script setup lang="ts">
  import { SETTINGS_MODULE } from '@/modules/settings/services';
  import { ThemeEnum } from '@/modules/settings/services/theme.ts';
  import { IZoomItem, SLIDER_STEP } from '@/modules/settings/services/zoom.ts';
  import { debounce } from '@/utils/debounce.ts';
  import { ref, watch } from 'vue';
  import { useTheme } from 'vuetify/framework';

  const allThemes = SETTINGS_MODULE.theme.getThemes();

  // > theme
  const theme = ref<ThemeEnum>(SETTINGS_MODULE.theme.getCurrentTheme().key);

  const themeInstance = useTheme();

  watch(
    () => theme.value,
    (value: ThemeEnum) => {
      const theme = SETTINGS_MODULE.theme.getThemeByKey(value);

      SETTINGS_MODULE.theme.setTheme(themeInstance, theme);
    }
  );
  // < theme

  // > zoom
  const zoomMax = SETTINGS_MODULE.zoom.getZoomMaxTickValue();
  const zoomTickSize = SETTINGS_MODULE.zoom.getTickSize();
  const zoomItems = SETTINGS_MODULE.zoom.getSliderTickLabels();
  const zoomValue = SETTINGS_MODULE.zoom.getZoomValue();
  const zoomTickValue = ref<number>(
    SETTINGS_MODULE.zoom.getTickValue(zoomValue)
  );

  const debounceSetZoom = debounce((tickValue: number) => {
    const zoomItem: IZoomItem =
      SETTINGS_MODULE.zoom.getZoomItemByTickValue(tickValue);
    SETTINGS_MODULE.zoom.setZoomValue(zoomItem);
  }, 1000);

  watch(
    () => zoomTickValue.value,
    (tickValue: number) => debounceSetZoom(tickValue)
  );
  // < zoom
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VSelect
        v-model="theme"
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
      <VSlider
        v-model="zoomTickValue"
        :ticks="zoomItems"
        show-ticks="always"
        :max="zoomMax"
        :step="SLIDER_STEP"
        :tick-size="zoomTickSize"
      ></VSlider>
    </VCol>
  </VRow>
</template>
