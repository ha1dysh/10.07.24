const fakeContacts = [
  { id: 1, name: 'Bob', age: 11, phone: '055 123 12 12' },
  { id: 2, name: 'Max', age: 22, phone: '055 654 12 12' },
  { id: 3, name: 'Eva', age: 33, phone: '055 888 12 12' },
  { id: 4, name: 'Ben', age: 44, phone: '055 777 12 12' },
  { id: 5, name: 'Sam', age: 55, phone: '055 666 12 12' },
];
const lorem2 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, est!';

function encodeUTF8(text: string): number[] {
  return text.split('').map((char: string) => char.charCodeAt(0));
}
console.log(encodeUTF8(lorem2)); // [76, 111, 114, 101, ...]

function decodeUTF8(array: number[]): string {
  return String.fromCharCode(...array);
}
console.log(decodeUTF8(encodeUTF8(lorem2))); // 'Lorem ipsum dolor ...'

function censorCard(card: string): string {
  const numbers = card
    .split('')
    .filter((char) => char.match(/\d/))
    .join('');
  if (numbers.length !== 16) {
    return 'incorrect card number';
  }
  return `${numbers.slice(0, 4)} **** **** ${numbers.slice(-4)}`;
}
console.log(censorCard('1234 5678 9012 3456')); // 1234 **** **** 3456
console.log(censorCard('1234567812345678')); // 1234 **** **** 5678
console.log(censorCard('1234 5678 1234 5678 12')); // incorrect card number
console.log(censorCard('34 5678 1234 5678')); // incorrect card number

function removeRepeats(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .filter((char, i, array) => array.indexOf(char) === i)
    .join('');
}
console.log(removeRepeats(lorem2)); // "lorem ipsudtacng.,!"

function upperCaseSecondLetter(text: string): string {
  return text
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char))
        .join('')
    )
    .join(' ');
}
console.log(upperCaseSecondLetter(lorem2)); // "LoReM IpSuM DoLoR SiT AmEt CoNsEcTeTuR AdIpIsIcInG ElIt. SoLuTa, EsT!";

function changeSign(num: number): number {
  if (num > 0) {
    return Number((num - num * 2).toFixed(2));
  } else if (num < 0) {
    return Number((num - num * 2).toFixed(2));
  }
  return 0;
}
console.log(changeSign(3.123123)); // -3.12
console.log(changeSign(-5.345345)); // 5.35
console.log(changeSign(0)); // 0

function doubleNumbers(str: string): string {
  return str
    .split('')
    .map((char) => char.match(/\d/))
    .filter((digit): digit is RegExpMatchArray => digit !== null)
    .map(([digit]) => Number(digit) * 2)
    .join(' ');
}
console.log(doubleNumbers('123456789')); // 2 4 6 8 10 12 14 16 18
console.log(doubleNumbers('a12s34d56e78f9')); // 2 4 6 8 10 12 14 16 18

function validatePassword(pas: string): string {
  const specSymbols = '!@#$%^&*';
  switch (true) {
    case pas.includes(' '):
      return 'spaces not allowed';
    case !pas.match(/[a-z]/g):
      return 'add at least one lower case char';
    case !pas.match(/[A-Z]/g):
      return 'add at least one upper case char';
    case !pas.split('').some((e) => specSymbols.includes(e)):
      return 'add at least one spec symbol "!@#$%^&*"';
    case !pas.match(/\d/g):
      return 'add at least 1 number';
    case pas.length > 16:
      return 'password too long';
    case pas.length < 8:
      return 'password too short';
    default:
      return 'correct password';
  }
}
console.log(validatePassword('qwe qwe')); // "spaces not allowed"
console.log(validatePassword('QWE123!!')); // "add at least 1 lower case char"
console.log(validatePassword('qwe123!!')); // "add at least 1 upper case char"
console.log(validatePassword('qweQWE!!')); // "add at least 1 number"
console.log(validatePassword('qweQWE123!@#$%^&*')); // "password too long"
console.log(validatePassword('qQ1!')); // "password too short"
console.log(validatePassword('qweQWE123!')); // "correct password"

function findUniqueNumber(array: number[]): number {
  const res = array.filter((e) => e !== array[0]);
  return res.length === 1 ? res[0] : array[0];
}
console.log(findUniqueNumber([2, 2, 5, 2, 2])); // 5
console.log(findUniqueNumber([2, 2, 2, 2, 10])); // 10
console.log(findUniqueNumber([2, 2, 2, 2, 11, 2, 2])); // 11

function sortMatrix(matrix: number[][]): number[][] {
  return matrix.map((row) => row.sort((a, b) => a - b));
}
console.log(
  sortMatrix([
    [2, 1, 3],
    [9, 6, 8],
    [7, 5, 4],
  ])
); // [[1, 2, 3], [6, 8, 9], [4, 5, 7]]

function camelCaseToGoogleStyle(array: string[]): string[] {
  return array.map((name) => name.replace(/([A-Z])/g, '-$1').toLowerCase());
}
console.log(camelCaseToGoogleStyle(['camelCase', 'testTestTest', 'fileName-5']));

interface Array<T> {
  max(): number | null;
}
Array.prototype.max = function (): number | null {
  const res = Math.max(...this.filter(Number));
  if (!res || !isFinite(res)) {
    return null;
  }
  return res;
};
console.log([1, 2, 3, 4, 5].max()); // 5
console.log(['a', 1, 'b', 2, 3, 4, 5].max()); // 5
console.log(['a'].max()); // null

function getBiggestNumbers(array1: number[], array2: number[]): number[] {
  return [...array1, ...array2].sort((a, b) => a - b).slice(-array1.length);
}
console.log(getBiggestNumbers([2, 4, 6, 8], [1, 5, 10, 15])); // [6, 8, 10, 15]

interface HasName {
  name: string;
}
function sortByName<T extends HasName>(contacts: T[]): T[] {
  return contacts.sort((a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0));
}
console.log(sortByName(fakeContacts)); // [Bob, Ben, Eva, Max, Sam]

interface IId {
  id: number
}
function updateById<T extends IId>(contacts: T[], id: number, newInfo: object): T[] {
  return contacts.map((c) => (c.id === id ? { ...c, ...newInfo } : c));
}
console.log(updateById(fakeContacts, 4, { phone: '098 765 43 21' })); // Ben phone - 098 765 43 21

function getNames<T extends HasName>(contacts: T[]): string[] {
  return contacts.map((c) => c.name);
}
console.log(getNames(fakeContacts)); // ['Bob', 'Ben', 'Eva', 'Max', 'Sam']

type ObjType = Record<string, string>
function addToObject(object: ObjType, property: string, value: string): string | ObjType {
  if (object.hasOwnProperty(property)) {
    return `свойство ${property} уже существует`;
  }
  object[property] = value;
  return object;
}
console.log(addToObject({}, 'name', 'Max')); // { name: 'Max' }
console.log(addToObject({ name: 'Bob' }, 'name', 'Eva')); // свойство name уже существует

class Human {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `Hi, my name is ${this.name}`;
  }
}
const bob = new Human('Bob');
const max = new Human('Max');
console.log(bob.sayHi()); // Hi, my name is Bob
console.log(max.sayHi()); // Hi, my name is Max

class Human2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `Hi, my name is ${this.name}`;
  }
}
const bob2 = new Human2('Bob');
const max2 = new Human2('Max');
console.log(bob.sayHi());
console.log(max.sayHi());

class Human3 {
  name: string
  friends: string[] = [];
  constructor(name: string) {
    this.name = name;
  }
  addFriend(fr: string): void {
    this.friends.push(fr);
  }
}
const bob3 = new Human3('Bob');
const max3 = new Human3('Max');
bob3.addFriend('john');
max3.addFriend('alex');
console.log(bob3.friends);
console.log(max3.friends);
