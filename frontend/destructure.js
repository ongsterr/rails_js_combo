// destructuring for object

const person = {
    firstName: "Susan",
    lastName: 'Boyle',
    age: '21',
    hobbies: ['Playing basketball', 'Watching movie', 'Playing board-game']
}

// const first = person.firstName
// const last = person['lastName']
// console.log(first, last)

const { firstName: first, lastName: last, age, hobbies } = person
console.log(first, last, `(${age})`)
console.log(hobbies)

const numbers = [1, 2, 3, 4, 5]
const [a, b, c, d, e] = numbers
console.log(a, b, c)