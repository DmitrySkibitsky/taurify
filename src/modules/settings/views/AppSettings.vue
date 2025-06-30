<script setup lang="ts">
  import {
    IAppSettingTab,
    TabKeyEnum,
  } from '@/modules/settings/views/types.ts';
  import { defineAsyncComponent, markRaw, ref } from 'vue';

  const tabs: IAppSettingTab[] = [
    {
      key: TabKeyEnum.appSettings,
      title: 'App Settings',
      icon: 'mdi-application-cog',
      component: markRaw(
        defineAsyncComponent(
          () => import('@/modules/settings/components/AppSettingsTab.vue')
        )
      ),
    },
    {
      key: TabKeyEnum.userProfile,
      title: 'User Profile',
      icon: 'mdi-account-settings',
      component: markRaw(
        defineAsyncComponent(
          () => import('@/modules/settings/components/UserProfile.vue')
        )
      ),
    },
  ];

  const tab = ref<string>(TabKeyEnum.appSettings);
</script>

<template>
  <VCard>
    <div style="width: 100%">
      <VTabs
        v-model="tab"
        align-tabs="center"
        show-arrows
        fixed-tabs
      >
        <VTab
          v-for="item in tabs"
          :key="item.key"
          :prepend-icon="item.icon"
          :text="item.title"
        />
      </VTabs>

      <VTabsWindow v-model="tab">
        <VTabsWindowItem
          v-for="item in tabs"
          :key="item.key"
          :value="item.title"
        >
          <VContainer>
            <component :is="item.component" />
          </VContainer>
        </VTabsWindowItem>
      </VTabsWindow>
    </div>
  </VCard>
</template>

<style scoped></style>
