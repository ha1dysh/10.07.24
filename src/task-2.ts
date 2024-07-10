// Задание 1
// Напишите функцию, которая на входе получает три аргумента: Имя, фамилию, отчество и возвращает строку формата Ф.И. Отчество (Первая буква должна быть заглавной, а все остальные маленькие).
function formatFullName(firstName: string, lastName: string, lastName2: string) {
  const firstLetter = (str:string) => str.charAt(0).toUpperCase();

  return `${firstLetter(firstName)}. ${firstLetter(lastName)}. ${
    firstLetter(lastName2) + lastName2.toLowerCase().slice(1)
  }`;
}
console.log(formatFullName('линус', 'Торвальд', 'МихайЛовИч')); // Л.Т. Михайлович
console.log(formatFullName('мАрта', 'ГрЕбЕнЮк', 'юриеВнА')); // М.Г. Юриевна

// Задание 2
// Напишите функцию, которая на входе получает один аргумент строку: мейл. Внутри функции идет проверка на формат строки, если она является мейлом, то строка разделяется на массив где первое значение массива это имя пользователя (все до символа @), а второй элемент это имя хоста (все после @). Если имя хоста "gmail.com" возвращается строка "gmail.com is forbidden". Если строка не является мейлом возвращается строка "Wrong email format". В остальных случая возвращается строка с валидным мейлом.
function validateEmail(email: string) {
  if (email.includes('gmail.com')) {
    return 'gmail.com is forbidden';
  }

  const hostname = email.trim().split('@')[1];

  const isHostCorrect =
    hostname &&
    hostname.includes('.') &&
    hostname.split('.').every((v) => v.trim().length);

  return isHostCorrect ? email : 'Wrong email format';
}
validateEmail('elon.mask@gmail.com'); // gmail.com is forbidden
validateEmail('elizabeth.green@yahoo.com'); // elizabeth.green@yahoo.com
validateEmail('123'); // Wrong email format
validateEmail('123@'); // Wrong email format
validateEmail('123@asd'); // Wrong email format
validateEmail('123@asd.'); // Wrong email format
validateEmail('123@asd.com'); // 123@asd.com

// Задание 3
// Напишите функцию, которая на входе получает 2 аргумента: текст и булевое значение subscription. Если subscription === false, то возвращаются только первые 20 символов текста, к которым апендится троеточие "..." и с новой строки добавляется текст: Для продолжения чтения оплатите подписку. Если subscription === false то возвращается полный текст.
const text =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt illo hic quae, laboriosam porro adipisci ab voluptate, non aut veniam iste ex aspernatur labore quia autem nostrum dolore! Eos, assumenda?';
function contentPreview(text:string, subscription: boolean) {
  const subscribe =
    text.slice(0, 20) + '... Для продолжения чтения оплатите подписку';

  return subscription ? text : subscribe;
}
console.log(contentPreview(text, false)); // Lorem ipsum dolor si... Для продолжения чтения оплатите подписку
console.log(contentPreview(text, true)); // text

// Задание 4
// Напишите функцию, которая принимает аргументом строку (str) и число (n). Удалите проблемы в начале и в конце строки, продублируйте строку n раз и запишите в новую переменную. Создайте массив где каждый элемент это строка str из новой переменной.
function trimAndRepeat(str: string, n: number) {
  return Array.from({ length: n }, () => str.trim());
}
console.log(trimAndRepeat(' asd ', 3)); // ["asd", "asd", "asd"]
console.log(trimAndRepeat(' 121 ', 2)); // ["121", "121"]

// Задание 5
// Дана строка (text). Напишите функцию, которая уберет все знаки приминания из текста, преобразует слова в нижний регистр и разобьет строки на отдельные слова.
const text2 = 'Hello, my name is Jack'; // [ 'hello', 'my', 'name', 'is', 'jack' ]
function removeAccents(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z \s]/gi, '')
    .split(' ');
}
console.log(removeAccents(text2));

// Задание 1
// Напишите функцию которая генерирует случайное целое число в диапазоне от 0 до 10. Аргументом задаете ваше число. Если ваше число больше рандомного возвращается "+" если меньше "-", если совпадает - "yes".
// random === 3;
function randomComparison(number: number) {
  const random = Math.floor(Math.random() * 11);
  if (random === number) {
    return 'yes';
  }
  return random > number ? '+' : '-';
}
console.log(randomComparison(2)); // "-"
console.log(randomComparison(5)); // "+"
console.log(randomComparison(3)); // "yes"

// Задание 2
// Напишите функцию, которая принимает в качестве аргумента строку. Попытайтесь привести строку к числовому значению (с плавающей запятой). Проверьте является ли значение NaN. Если да, верните строку "Невозможно преобразовать в число", в противном случае верните число.
function stringToNumber(str: string) {
  const number = parseFloat(str);
  return isNaN(number) ? 'Невозможно преобразовать в число' : number;
}
console.log(stringToNumber('3.12asds')); // 3.12
console.log(stringToNumber('5hello')); // 5
console.log(stringToNumber('hello12')); // "Невозможно преобразовать в число"

// Задание 3
// Напишите функцию, которая приминает в качестве первого аргумента число с плавающей запятой и второго - количество цифер после запятой. Верните число с количеством символом после запятой указаным вторым аргументом.
function formatDecimal(number: number, digits: number) {
  return number.toFixed(digits);
}
console.log(formatDecimal(3.1415, 2)); // 3.14
console.log(formatDecimal(23.12455, 4)); // 23.1245

// Задание 4
// Напишите функцию, которая принимает в качестве аргумента массив чисел и возвращает максимальное число из массива.
const maxNumber = (numbers: number[]) => Math.max(...numbers);
const numbers = [1, 2, 3, 4, 5];
console.log(maxNumber(numbers)); // 5

// Задание 5

// Напишите функцию, которая принимает в качестве аргументов два числа. Первое число должно быть округленным до ближайшего целого и возведено в степень, которая указана вторым аргументом.
function roundAndPower(number: number, power: number) {
  return Math.pow(Math.round(number), power);
}
console.log(roundAndPower(4.24, 2)); // 16
console.log(roundAndPower(5.56, 3)); // 216

// Задание 1
// Дано массив из чисел. Сведите этот массив к одному числу, который является суммой всех чисел массива, не используя цикл или метод forEach.
const numbers1 = [23, 22, 135, 2];
function arraySum(numbers: number[]) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
console.log(arraySum(numbers1)); // 182

// Задание 2
// Данно массив строк. Напишите функцию, которая принимает аргументом этот массив, и вторым аргументов строку. Отфильтруйте все строки массива которые содержат подстроку указаную вторым аргументом и соедините отфильтрованный массив в одну строку.
function filterAndJoinStrings(strings: string[], substring: string) {
  return strings.filter((str: string) => str.includes(substring)).join(' ');
}
console.log(filterAndJoinStrings(['dog', 'cat', 'mouse', 'elephant'], 'o')); // "dog mouse"
console.log(
  filterAndJoinStrings(['apple', 'banana', 'apricot', 'cherry'], 'ap')
); // "apple apricot"

// Задание 3
// Данно массив чисел. Напишите функцию, которая принимает аргументом этот массив и число. Создайте на основе массива из первого аргумента новый массив увеличив каждое число на 10. Дальше верните true если в массиве есть хотя б одно число, которое больше числа указаного вторым аргументом и false в противном случае. Нельзя использовать цикл или метод forEach.
function increaseAndCheck(numbers: number[], number: number) {
  return numbers.some((num: number) => num + 10 > number);
}
console.log(increaseAndCheck([1, 2, 3, 4, 5], 20)); // false (15 <= 20)
console.log(increaseAndCheck([-5, 0, 5], 10)); // true (15 > 10)

// Задание 4
// Напишите функцию, которая будет принимать первым аргументом массив обьектов, вторым новый обьект который надо добавить и третим обьект который надо удалить по айди (опционально).
const students = [
  { id: 1, name: 'Alice', age: 17, grade: 'A' },
  { id: 2, name: 'Bob', age: 20, grade: 'B' },
  { id: 3, name: 'Charlie', age: 18, grade: 'C' },
];
type TStudent = typeof students[0]
function updateArray(students: TStudent[], newStudent: TStudent, index?: number) {
  const res = students.filter(({ id }: TStudent) => id !== index);
  res.push(newStudent);
  return res;
}
console.log(
  updateArray(students, { id: 4, name: 'Dave', age: 21, grade: 'A' }, 2)
);
// [({ id: 1, name: 'Alice', age: 17, grade: 'A' },
// { id: 3, name: 'Charlie', age: 18, grade: 'C' },
// { id: 4, name: 'Dave', age: 21, grade: 'A' })];
console.log(
  updateArray(students, { id: 5, name: 'James', age: 19, grade: 'B' })
);
// [({ id: 1, name: 'Alice', age: 17, grade: 'A' },
// { id: 2, name: 'Bob', age: 20, grade: 'B' },
// { id: 3, name: 'Charlie', age: 18, grade: 'C' },
// { id: 5, name: 'James', age: 19, grade: 'B' })];

// Задание 5
// Дано два массива с именами. Напиши функцию, которая принимает аргументами эти два массива, соединяет их в один и сортирует по алфавитному порядку имена. Проверяет есть ли в массиве имя Джон и если находит возвращает "Error" если нет возвращает отсортированный массив.
function mergeAndSortNames(array1: string[], array2: string[]) {
  const res = [...array1, ...array2].sort();
  return res.includes('Джон') ? 'Error' : res;
}
const names1 = ['Анна', 'Иван', 'Сергей'];
const names2 = ['Мария', 'Джон', 'Павел'];
console.log(mergeAndSortNames(names1, names2)); // "Error"
const names3 = ['Анна', 'Иван', 'Сергей'];
const names4 = ['Мария', 'Павел', 'Николай'];
console.log(mergeAndSortNames(names3, names4)); // ["Анна", "Иван", "Мария", "Николай", "Павел", "Сергей"]
