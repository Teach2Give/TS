"use strict";
//type guard is ts refers to the ability to narrow down the type of an objkect within a certain scope.
//its donw  using conditional statements that check the type of an object
let value;
const random = Math.random();
value = random < 0.33 ? "Hello" : random < 0.66 ? 123.456 : true;
const checkValue = (value) => {
    if (typeof value === "string") {
        console.log(value.toLowerCase());
        return;
    }
    if (typeof value === "number") {
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
    if (animalType.type === "dog") {
        animalType.bark(); // Call bark for Dog
    }
    else if (animalType.type === "cat") {
        animalType.meow(); // Call meow for Cat
    }
};
// we can also use in
const makeSoundIN = (animalType) => {
    if ("bark" in animalType) {
        animalType.bark();
    }
    else {
        animalType.meow();
    }
};
// Example usage
const myDog = {
    type: "dog",
    name: "Rex",
    bark: () => console.log("Woof!"),
};
const myCat = {
    type: "cat",
    name: "Mittens",
    meow: () => console.log("Meow!"),
};
makeSound(myDog); // Output: "Woof!"
makeSound(myCat); // Output: "Meow!"
//truthy or falsey
function printLength(str) {
    //true1
    if (str) {
        console.log(str.length);
    }
    else {
        console.log("No string providsee ");
    }
}
printLength("my name");
printLength("");
printLength(null);
printLength(undefined);
//instance of
//check contructor or instance of something
try {
    throw new Error("This is an error");
}
catch (error) {
    if (error instanceof Error) {
        console.log(`Caught an Error Object: ${error.message}`);
    }
    else {
        console.log("Unkown error");
    }
}
//this will say Caught an Error Object: ${error.message}
//if we change     throw new Error('This is an error') to throw 'some error'
// the result is Unknown error
function checkInput(input) {
    if (input instanceof Date) {
        return input.getFullYear().toString();
    }
    return input.toString(); // Ensures it's returned as a string
}
const fullYear = checkInput(new Date());
const fullYear2 = checkInput("2024-06-12");
// type assertion using is and as
// The is keyword is used in user-defined type guards. It helps narrow down the type of an object or variable inside a conditional block by checking if the object or variable is of a certain type.
// Type Guard: A type guard is a function that returns a boolean and indicates if the type of a value is a specific type.
// In the example, animal is Dog means if the function returns true, then TypeScript knows that animal is of type Dog inside the if block.
// The isDog function checks if the object has a bark method, which would only be present if it's a Dog.
function isDog(animal) {
    return animal.bark !== undefined;
}
const makeSound3 = (animal) => {
    if (isDog(animal)) {
        animal.bark(); // Safe: TypeScript knows it's a Dog
    }
    else {
        animal.meow(); // Safe: TypeScript knows it's a Cat
    }
};
// . as keyword (Type Assertions)
// The as keyword is used for type assertions, which let you tell TypeScript that you know more about the type of a variable than it currently does. It’s a way of saying to TypeScript, "Trust me, I know this variable will be of a certain type."
// let value = someVariable as Type;
let someValue1 = "Hello, TypeScript";
// TypeScript doesn't know the type, so we assert that it's a string
let strLength = someValue.length;
console.log(strLength); // Output: 16
// Step 3: Define the reducer function
const counterReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                count: state.count + (action.payload || 1), // Increment by payload or default to 1
            };
        case 'decrement':
            return {
                count: state.count - (action.payload || 1), // Decrement by payload or default to 1
            };
        case 'reset':
            return {
                count: 0, // Reset the counter to 0
            };
        default:
            return state; // Return the current state for any unknown action
    }
};
// Example usage
const initialState = { count: 0 };
const newStateIncrement = counterReducer(initialState, { type: 'increment', payload: 5 });
console.log(newStateIncrement); // { count: 5 }
const newStateDecrement = counterReducer(newStateIncrement, { type: 'decrement', payload: 2 });
console.log(newStateDecrement); // { count: 3 }
const resetState = counterReducer(newStateDecrement, { type: 'reset' });
console.log(resetState); // { count: 0 }
