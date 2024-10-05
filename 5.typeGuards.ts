//type guard is ts refers to the ability to narrow down the type of an objkect within a certain scope.
//its donw  using conditional statements that check the type of an object  

// In TS, a type Guard is some expressiion that performs a runtime check that guarantees the type in some scope 

type ValueType = string | number | boolean 

let value: ValueType
const random = Math.random()
value = random < 0.33 ? 'Hello' : random < 0.66 ? 123.456 : true

const checkValue = (value: ValueType) => {
    if(typeof value === 'string') {
        console.log(value.toLowerCase())
        return
    }
    if(typeof value === 'number') {
        console.log(value.toFixed(2))
        return
    }
    // if(typeof value !=='number' || typeof value !=='string') {
    //     console.log(`Boolean: ${value}`)
    //     return
    // }
    console.log(`Boolean: ${value}`)
}
checkValue(value)

//narrowing using object properties
type Dog1 = { type: 'dog'; name: string; bark: () => void }
type Cat1 = { type: 'cat'; name: string; meow: () => void }
type AnimalType = Dog1 | Cat1

const makeSound = (animalType: AnimalType) => {
  if (animalType.type === 'dog') {
    animalType.bark(); // Call bark for Dog
  } else if (animalType.type === 'cat') {
    animalType.meow(); // Call meow for Cat
  }
}

// we can also use in 
const makeSoundIN = (animalType: AnimalType) => {
    if('bark' in animalType) {
        animalType.bark()
    } else {
        animalType.meow()
    }
}
// Example usage
const myDog: Dog1 = { type: 'dog', name: 'Rex', bark: () => console.log('Woof!') }
const myCat: Cat1 = { type: 'cat', name: 'Mittens', meow: () => console.log('Meow!') }

makeSound(myDog);  // Output: "Woof!"
makeSound(myCat);  // Output: "Meow!"
