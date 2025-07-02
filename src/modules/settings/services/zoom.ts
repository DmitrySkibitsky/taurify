import { AppStorage, createStorage, File } from '@/app/services/storage.ts';
import { useSettingsStore } from '@/modules/settings/stores/settings.ts';
import { getCurrentWebview } from '@tauri-apps/api/webview';

export interface IZoomItem {
  tickValue: number;
  value: number;
  label: string;
}

export interface IZoomSliderItem {
  [key: number]: string;
}

export const SLIDER_STEP: number = 1;

const ZOOM_ITEMS: IZoomItem[] = [
  { tickValue: 0, value: 0.25, label: '25%' },
  { tickValue: 1, value: 0.5, label: '50%' },
  { tickValue: 2, value: 0.6, label: '60%' },
  { tickValue: 3, value: 0.75, label: '75%' },
  { tickValue: 4, value: 0.9, label: '90%' },
  { tickValue: 5, value: 1, label: '100%' },
  { tickValue: 6, value: 1.1, label: '110%' },
  { tickValue: 7, value: 1.25, label: '125%' },
  { tickValue: 8, value: 1.4, label: '140%' },
  { tickValue: 9, value: 1.5, label: '150%' },
  { tickValue: 10, value: 2, label: '200%' },
];

const createSliderTickLabels = (items: IZoomItem[]): IZoomSliderItem => {
  return items.reduce<IZoomSliderItem>((result, { tickValue, label }) => {
    result[tickValue] = label;
    return result;
  }, {});
};

let storage: AppStorage | null = null;

const getStorage = async (): Promise<AppStorage> => {
  if (storage === null) {
    storage = await createStorage(File.Settings);
  }

  return storage;
};

export class Zoom {
  #sliderTickLabels: Record<number, string>;

  constructor() {
    this.#sliderTickLabels = createSliderTickLabels(ZOOM_ITEMS);
  }

  private getZoomItemByValue(zoomValue: number): IZoomItem {
    return ZOOM_ITEMS.find((item: IZoomItem) => {
      return item.value === zoomValue;
    })!;
  }

  private getTickValueByZoomValue(zoomValue: number): number {
    return this.getZoomItemByValue(zoomValue)!.tickValue;
  }

  public getZoomItemByTickValue(tickValue: number): IZoomItem {
    return ZOOM_ITEMS.find((item: IZoomItem) => {
      return item.tickValue === tickValue;
    })!;
  }

  public getSliderTickLabels(): Record<number, string> {
    return this.#sliderTickLabels;
  }

  public getZoomValue(): number {
    const settingsStore = useSettingsStore();

    return settingsStore.zoomValue;
  }

  public getTickValue(zoomValue: number): number {
    return this.getTickValueByZoomValue(zoomValue);
  }

  public async setZoomValue(zoomItem: IZoomItem): Promise<void> {
    const settingsStore = useSettingsStore();

    settingsStore.setZoomValue(zoomItem.value);

    storage = await getStorage();

    await storage.set('zoomValue', zoomItem.value);

    await getCurrentWebview().setZoom(zoomItem.value);
  }

  public getTickSize(): number {
    return ZOOM_ITEMS.length;
  }

  public getZoomMaxTickValue(): number {
    return Math.max(...ZOOM_ITEMS.map((item) => item.tickValue));
  }

  public async init(): Promise<void> {
    storage = await getStorage();

    const zoomValue: number | undefined = await storage.get('zoomValue');

    if (zoomValue === undefined) {
      return;
    }

    const zoomItem: IZoomItem = this.getZoomItemByValue(zoomValue);

    await this.setZoomValue(zoomItem);
  }
}

export default new Zoom();
