const lorem = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, amet.';

// 1.
function randomUsername(text: string) {
  const random = () => Math.floor(Math.random() * 10);
  const randomName = text.replace(/[^a-z\s]/g, '').split(' ');
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const res1 = capitalize(randomName[random()]);
  const res2 = capitalize(randomName[random()]);

  return `${res1} ${res2}`;
}

console.log(randomUsername(lorem));
console.log(randomUsername(lorem));

// 2.
function randomMessage(text: string) {
  return text
    .split(' ')
    .slice(Math.floor(Math.random() * 10))
    .join(' ');
}
console.log(randomMessage(lorem));
console.log(randomMessage(lorem));

// 3.
function findWordIndex(text: string, word: string) {
  if (!text.toLowerCase().includes(word.toLowerCase())) {
    return 'слово не найдено';
  }

  return 'индекс: ' + text.indexOf(word);
}
console.log(findWordIndex(lorem, 'consectetur'));
console.log(findWordIndex(lorem, '123'));

// 4.
function countLetters(text: string, letter: string) {
  const regEx = new RegExp(`[^${letter}]`, 'gi');
  return text.replace(regEx, '').length;
}
console.log(countLetters(lorem, 's'));
console.log(countLetters(lorem, 'd'));

// 5.
function inputValidation(text: string) {
  if (text.trim().length < 3) {
    return 'too short';
  }
  if (text.trim().length > 1000) {
    return 'too long';
  }
  return text;
}
console.log(inputValidation('12'));
console.log(inputValidation(lorem));

// 6.
function genRandomProfit(price: number) {
  setInterval(() => {
    console.log((price += Math.random() * 1.1).toFixed(2));
  }, 1000);
}
genRandomProfit(54.8);
genRandomProfit(127.8);

// 7.
function genHexColor() {
  const random = () => Math.floor(Math.random() * 16).toString(16);
  return `#${random()}${random()}${random()}`;
}
console.log(genHexColor());
console.log(genHexColor());

// 8.
function uaCurrencyIntl(num: number) {
  return Intl.NumberFormat('ua', {
    style: 'currency',
    currency: 'UAH',
  }).format(num);
}
console.log(uaCurrencyIntl(123.131));
console.log(uaCurrencyIntl(456.5631));

// 9.
function uaDateIntl(date: Date) {
  return Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(date);
}
console.log(uaDateIntl(new Date()));

// 10.
function findAllNumbers(text: string) {
  const numbers = text.replace(/\D/g, '');
  return parseInt(numbers);
}
console.log(findAllNumbers('123abc456def789'));

// 11.
function removeWord(text: string, word: string) {
  return text
    .toLowerCase()
    .split(' ')
    .filter((w) => w !== word.toLowerCase())
    .join(' ');
}
console.log(removeWord(lorem, 'adipisicing'));

// 12.
function sortWordsByLength(text: string) {
  return text
    .replace(/[^\W\S]/gi, '')
    .split(' ')
    .sort((a, b) => a.length - b.length)
    .join(' ');
}
console.log(sortWordsByLength(lorem));

// 13.
function reverseEveryWord(text: string) {
  const words = text.split(' ');
  const reversedWords = words.map((word) => word.split('').reverse().join(''));
  return reversedWords.join(' ');
}
console.log(reverseEveryWord(lorem));

// 14.
function findLongestWord(text: string) {
  return text.split(' ').reduce((longest, word) => {
    return word.length > longest.length ? word : longest;
  });
}
console.log(findLongestWord(lorem));

// 15.
function createDivsForEveryWord(text: string) {
  const words = text.split(' ');
  const divs = words.map((word) => `<div>${word}</div>`);
  return divs.join('');
}
console.log(createDivsForEveryWord(lorem));
