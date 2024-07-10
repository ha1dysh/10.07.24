// Сделать функцию которая сможет делать срез данных с ассоциативного массива.

let data = [
  { name: 'Vasya', email: 'vasya@example.com', age: 20, skills: { php: 0, js: -1, madness: 10, rage: 10 } },
  { name: 'Dima', email: 'dima@example.com', age: 34, skills: { php: 5, js: 7, madness: 3, rage: 2 } },
  { name: 'Colya', email: 'colya@example.com', age: 46, skills: { php: 8, js: -2, madness: 1, rage: 4 } },
  { name: 'Misha', email: 'misha@example.com', age: 16, skills: { php: 6, js: 6, madness: 5, rage: 2 } },
  { name: 'Ashan', email: 'ashan@example.com', age: 99, skills: { php: 0, js: 10, madness: 10, rage: 1 } },
  { name: 'Rafshan', email: 'rafshan@example.com', age: 11, skills: { php: 0, js: 0, madness: 0, rage: 10 }},
];

type TPersonSkills = { php: number, js: number, madness: number, rage: number };
type TPerson = {
  name: string;
  email: string;
  age: number;
  skills: TPersonSkills;
}

function arrayPluck<T>(arr: T[], name: string) {
  const keys = name.split('.')
  return arr.map((obj) =>
    keys.reduce((obj: unknown, string: string) => {
        return (obj as Record<string, unknown>)[string]
    }, obj)
  );
}

console.log(arrayPluck<TPerson>(data, 'name')); // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
console.log(arrayPluck<TPerson>(data, 'skills.php')); // [0, 5, 8, 6, 0, 0]
