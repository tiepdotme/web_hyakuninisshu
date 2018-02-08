export function convertCamelKey(json: { [key: string]: any }) {
  const result = {};
  convert(json, result);
  return result;
}

function convert(value: any, result: { [key: string]: any }) {
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      if (isPrimitive(value[key])) {
        result[snakeToCamel(key)] = value[key];
      } else if (Array.isArray(value[key])) {
        result[snakeToCamel(key)] = value[key].map((v: any) => {
          const itemResult = {};
          convert(v, itemResult);
          return itemResult;
        });
      } else {
        convert(value[key], result);
      }
    }
  }
}

function isPrimitive(v: any) {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    typeof v === 'undefined'
  );
}

function snakeToCamel(v: string) {
  return v.replace(/_./g, s => s.charAt(1).toUpperCase());
}

export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomizeArray = <T>(array: T[]) => {
  const dup = [...array];
  for (let i = dup.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = dup[i];
    dup[i] = dup[r];
    dup[r] = tmp;
  }
  return dup;
};
