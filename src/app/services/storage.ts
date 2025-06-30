import { load, Store } from '@tauri-apps/plugin-store';

export enum File {
  User = 'user.json',
  Settings = 'settings.json',
}

export class AppStorage {
  private store!: Store;

  constructor(private file: File) {}

  async init(): Promise<void> {
    this.store = await load(this.file, {
      autoSave: false,
    });
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.store.get<T>(key);

    return value as T | undefined;
  }

  async set<T>(key: string, value: T): Promise<AppStorage> {
    await this.store.set(key, value);

    return this;
  }

  async save(): Promise<AppStorage> {
    await this.store.save();

    return this;
  }
}

export async function createStorage(file: File): Promise<AppStorage> {
  const storage = new AppStorage(file);

  await storage.init();

  return storage;
}
