import { MdiIcon } from '@/app/types/mdi-icons.ts';

export interface Route {
  name: string;
}

export interface MenuItem {
  title: string;
  icon: MdiIcon;
  to?: Route | undefined;
  onClick?: Function | undefined;
}
