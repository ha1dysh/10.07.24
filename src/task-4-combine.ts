// 12. Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.

let testData = [1, 2, 1990, 85, 24, 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com', true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];

type TArray = (number | string | boolean)[]

function arrayCombine(arr1: TArray, arr2: TArray) {
  return arr1.reduce((acc, cur, i) => {
    if (typeof cur === 'string' || Number.isInteger(cur)) {
      return { ...acc, [cur as string]: arr2[i] };
    }
    return acc;
  }, {});
}

console.log(arrayCombine(testData, testData2)); // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}
