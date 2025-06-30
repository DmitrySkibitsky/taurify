import { AppModule } from '@/app/types/mudule';

export async function loadModules(moduleNames: string[]): Promise<AppModule[]> {
  const modules: AppModule[] = [];

  for (const moduleName of moduleNames) {
    const module = await import(`@/modules/${moduleName}/index.ts`);

    modules.push(module.default);
  }

  return modules;
}
