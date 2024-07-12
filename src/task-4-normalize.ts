let testData4 = [
  { name: "Vasya", email: "vasya@example.com", age: "20" },
  { name: "Dima", email: "dima@example.com", age: 34.6 },
  { name: "Colya", email: "colya@example.com", age: 46 },
  { name: "Misha", email: "misha@example.com", age: 16 },
  { name: "Ashan", email: "ashan@example.com", age: 99 },
  { name: "Rafshan", email: "rafshan@example.com", age: 11 },
  1,
  2,
  1990,
  85,
  24,
  "Vasya",
  "colya@example.com",
  "Rafshan",
  "ashan@example.com",
  true,
  false,
  [
    [
      [
        [
          1,
          2,
          1990,
          85,
          24,
          "Vasya",
          "colya@example.com",
          "Rafshan",
          "ashan@example.com",
          true,
          false,
          [{ name: "Rafshan", email: "rafshan@example.com", age: 11 }],
        ],
      ],
    ],
  ],
];

// Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.
//    Доступные шаблоны:
//    'string' => строки,
//    'number' => числа,
//    'int' => целые числа,
//    'float' => числа с плавающей точкой,
//    'bool' => true | false,
//    'function' => функция,
//    'array' => массив,
//    Object => объект {name: 'string'}
//    Синтаксис: array_normalize(arr: array, shema: string|Object[, transform: bool = false]): any[]

type Schema = 'string' | 'number' | 'int' | 'float' | 'bool' | 'function' | 'array' | { [key: string]: Schema };
type Result = number | string | boolean | unknown[] | Function | { [key: string]: Result };

function arrayNormalize(arr: unknown[], scheme: Schema, transform: boolean = false): Result[] {
  if (scheme === "string") {
    return normalizeString(arr, transform);
  }
  if (scheme === "float") {
    return normalizeFloat(arr, transform);
  }
  if (scheme === "int") {
    return normalizeInt(arr, transform);
  }
  if (scheme === "number") {
    return normalizeNumber(arr, transform);
  }
  if (scheme === "bool") {
    return normalizeBool(arr, transform);
  }
  if (scheme === "array") {
    return normalizeArray(arr, transform);
  }
  if (scheme === "function") {
    return normalizeFunction(arr, transform);
  }
  if (typeof scheme === "object") {
    return normalizeObject(arr, scheme, transform);
  }
  return [];
}

function isString(str: unknown): str is string {
  return typeof str === "string"
}

function normalizeString(arr: unknown[], transform: boolean = false): string[] {
  if (transform) {
    arr = arr.map((el) => {
      if (typeof el === "number" || typeof el === "string") {
        return String(el);
      }
    });
  }
  return arr.filter(isString);
}

function normalizeNumber(arr: unknown[], transform: boolean = false): number[] {
  if (transform) {
    arr = arr.map((el) => {
      const numberValue = Number(el);
      if (!Number.isNaN(numberValue)) {
        return numberValue;
      }
    });
  }
  return arr.filter((el) => typeof el === "number") as number[];
}

function normalizeInt(arr: unknown[], transform: boolean = false): number[] {
  if (transform) {
    arr = arr.map((el) => parseInt(String(el)));
  }
  return arr.filter((el) => typeof el === "number" && Number.isInteger(el)) as number[];;
}

function normalizeFloat(arr: unknown[], transform: boolean = false): number[] {
  if (transform) {
    return (arr = arr.map((el) => parseFloat(String(el))));
  }
  return arr.filter((el) => typeof el === "number" && !Number.isInteger(el)) as number[];;
}

function normalizeBool(arr: unknown[], transform: boolean = false): boolean[] {
  if (transform) {
    arr = arr.map((el) => Boolean(el));
  }
  return arr.filter((el) => typeof el === "boolean") as boolean[];
}

function normalizeArray(arr: unknown[], transform: boolean = false) {
  if (transform) {
    arr = arr.map((el) => Array.isArray(el) ? el : [el]);
  }
  return arr.filter((el): el is unknown[] => Array.isArray(el));
}

function normalizeFunction(arr: unknown[], transform: boolean = false): Function[] {
  if (transform) {
    arr = arr.map((el) => new Function(String(el)));
  }
  return arr.filter((el) => el instanceof Function) as Function[];
}

function normalizeObject(arr: unknown[], scheme: Record<string, Schema>, transform: boolean = false) {
  const arrOfNormalizedObject: Record<string, Result>[] = [];

  const arrOfObj = arr.filter((el) => typeof el === "object" && el !== null) as object[];

  for (const obj of arrOfObj) {
    const normalizedObject: Record<string, Result> = {};

    for (const key in scheme) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const resultOfNormalizeValues = arrayNormalize(
          [value],
          scheme[key],
          transform
        );
        if (resultOfNormalizeValues.length > 0) {
          normalizedObject[key] = resultOfNormalizeValues;
        }
      }
    }

    if (Object.keys(normalizedObject).length > 0) {
      arrOfNormalizedObject.push(normalizedObject);
    }
  }
  return arrOfNormalizedObject;
}


let result = arrayNormalize(testData4, "string"); // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
let result2 = arrayNormalize(testData4, "string", true); // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
let result3 = arrayNormalize(testData4, { age: "int" }); // []
let result4 = arrayNormalize(testData4, { age: "int" }, true); // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]
// let result3 = arrayNormalize(testData4, { email: "string" });

console.log(result);
console.log(result2);
console.log(result3);
console.log(result4[0]);
