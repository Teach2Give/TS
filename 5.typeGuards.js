"use strict";
//type guard is ts refers to the ability to narrow down the type of an objkect within a certain scope.
//its donw  using conditional statements that check the type of an object  
let value;
const random = Math.random();
value = random < 0.33 ? 'Hello' : random < 0.66 ? 123.456 : true;
const checkValue = (value) => {
    if (typeof value === 'string') {
        console.log(value.toLowerCase());
        return;
    }
    if (typeof value === 'number') {
        console.log(value.toFixed(2));
        return;
    }
    // if(typeof value !=='number' || typeof value !=='string') {
    //     console.log(`Boolean: ${value}`)
    //     return
    // }
    console.log(`Boolean: ${value}`);
};
checkValue(value);
const makeSound = (animalType) => {
    if (animalType.type === 'dog') {
        animalType.bark(); // Call bark for Dog
    }
    else if (animalType.type === 'cat') {
        animalType.meow(); // Call meow for Cat
    }
};
// we can also use in 
const makeSoundIN = (animalType) => {
    if ('bark' in animalType) {
        animalType.bark();
    }
    else {
        animalType.meow();
    }
};
// Example usage
const myDog = { type: 'dog', name: 'Rex', bark: () => console.log('Woof!') };
const myCat = { type: 'cat', name: 'Mittens', meow: () => console.log('Meow!') };
makeSound(myDog); // Output: "Woof!"
makeSound(myCat); // Output: "Meow!"
