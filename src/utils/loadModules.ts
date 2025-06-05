export async function loadModules(moduleNames: string[]): Promise<any> {
  const modules: any[] = [];

  for (const moduleName of moduleNames) {
    const module = await import(`@/modules/${moduleName}/index.ts`);

    modules.push(module.default);
  }

  return modules;
}
