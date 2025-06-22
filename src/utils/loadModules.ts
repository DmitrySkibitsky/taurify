export async function loadModules(moduleNames: string[]): Promise<object[]> {
  const modules: object[] = [];

  for (const moduleName of moduleNames) {
    const module = await import(`@/modules/${moduleName}/index.ts`);

    modules.push(module.default);
  }

  return modules;
}
