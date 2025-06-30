import { Component, Raw } from 'vue';

export enum TabKeyEnum {
  appSettings = 'app-settings',
  userProfile = 'user-profile',
}

export interface IAppSettingTab {
  key: TabKeyEnum;
  title: string;
  icon: string;
  component: Raw<Component>;
}
