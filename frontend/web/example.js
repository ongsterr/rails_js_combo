
const fruit = ['banana', 'apple', 'orange']

const numFruit = fruit.push('pear') // .push returns the number of elements in the array. .push mutate the original array
console.log(fruit)
console.log(numFruit)

const newFruit = fruit.concat('pear') // .concat does not mutate the original array
console.log(newFruit)

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(2))
console.log('-------------------------')

// Using slice, create newCar from myCar.
var myHonda = { color: 'red', wheels: 4, engine: { cylinders: 4, size: 2.2 } }
var myCar = [myHonda, 2, 'cherry condition', 'purchased 1997']
var newCar = myCar.slice(0, 2)

// Display the values of myCar, newCar, and the color of myHonda
//  referenced from both arrays.
console.log('myCar = ' + JSON.stringify(myCar))
console.log('newCar = ' + JSON.stringify(newCar))
console.log('myCar[0].color = ' + myCar[0].color)
console.log('newCar[0].color = ' + newCar[0].color)

// Change the color of myHonda.
myHonda.color = 'purple'
console.log('The new color of my Honda is ' + myHonda.color)

// Display the color of myHonda referenced from both arrays.
console.log('myCar[0].color = ' + myCar[0].color)
console.log('newCar[0].color = ' + newCar[0].color)



function doSomething(arr) {
    return arr.reverse() // Mutate the original array
}

const x = doSomething(fruit)
console.log(x, fruit)

const fruit2 = fruit.map(x => {
    return x + '!'
})

console.log(fruit2)

fruit.forEach(x => {
    console.log(fruit)
    fruit.pop()
})

console.log(fruit)

// What is a spread? "...arr"

const spread = ['jam', 'peanut butter', 'honey']
const y = [...spread, 'toast']
console.log(spread, y);

// Can try using function constructor

const person = {
    firstName: 'Sarah',
    lastName: 'Connor'
}

const arr = [person.firstName, person.lastName]

function greeting(firstName, lastName) {
    console.log(`Terminator says: "Hello ${firstName} ${lastName}!`)    
}

greeting(...arr)

const sarah = {...person}
console.log(sarah.firstName = 'John')
console.log(sarah, person)