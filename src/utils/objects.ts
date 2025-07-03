export function toCamelCase<T extends unknown>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as T;
  } else if (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object
  ) {
    const newObj: Record<string, unknown> = {};

    for (const key in obj as object) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        newObj[camelKey] = toCamelCase((obj as Record<string, unknown>)[key]);
      }
    }

    return newObj as T;
  }

  return obj;
}
