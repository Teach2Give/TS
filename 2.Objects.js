"use strict";
// objcet literal creation {...} - obj['key'] or obj.key
const poet = {
    born: 1956,
    name: "Mary Wendo"
};
poet["born"]; // Type: number
poet.name; // Type: string
// tryong to access an unavailable eber leads to an error
// poet.end
// Property 'end' does not exist on type '{ born: number; name: string; }'.ts(2339)
// declaring object types  
// const objectNameType: { key:type; key1:type; key3:type}
let poetLater;
// you can not utilize a value as a type
//'poetLater' refers to a value, but is being used as a type here.
// Did you mean 'typeof poetLater'?
/*
const poetStd: poetLater =  {
} */
// insstead we can use it like this 
const poetStd = {
    born: 2029,
    name: "Gamal"
};
// we can now create two books or even more  
const FullStackReact = {
    title: "Fullstack React",
    publisher: "John Fuller",
    year: 2024
};
const FullStackVue = {
    title: "Fullstack Vue",
    publisher: "Fatmah Adillah",
    year: 2024
};
//Each type has a single property—WithFirstName
// has a firstName property, and WithLastName has a lastName property.
const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
}; //This object has both firstName and lastName properties.
// Now, because TypeScript uses structural typing,
//  the object hasBoth can be assigned to a variable
//  of type WithFirstName or WithLastName, even though
//   hasBoth was never explicitly declared as either type.
//    What matters is that hasBoth contains the 
//    required properties (either firstName or lastName):
let withFirstName = hasBoth; // Ok, because hasBoth has a `firstName` property
let withLastName = hasBoth; // Ok, because hasBoth has a `lastName` property
// Now, you provide an object hasBoth that has both required properties:
const hasBoth2 = {
    first: "Sarojini",
    last: "Naidu",
}; // Ok
// Since hasBoth includes both first and last properties as strings, TypeScript accepts it as valid.
//However, if you try to assign an object like hasOnlyOne
// that is missing the last property, TypeScript will throw an error:
const hasOnlyOne2 = {
    first: "Sappho",
};
const hasStartString = {
    start: "1879-02-13",
    // Error: Type 'string' is not assignable to type 'Date'.
};
// Ok: all fields match what's expected in Poet
const poetMatch = {
    born: 1928,
    name: "Maya Angelou"
};
const extraProperty = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};
// Error: Type '{ activity: string; born: number; name: string; }'
// is not assignable to type 'Poet'.
// Object literal may only specify known properties,
// and 'activity' does not exist in type 'Poet'.
// but this does not trigger error
const existingObject = {
    activity: "walking",
    born: 1935,
    name: "Mary Oliver",
};
const extraPropertyButOk = existingObject; // Ok
const poemMatch = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};
const poemMismatch = {
    author: {
        name: "Sylvia Plath",
    },
    // Error: Type '{ name: string; }' is not assignable
    // to type '{ firstName: string; lastName: string; }'.
    // Object literal may only specify known properties, and 'name'
    // does not exist in type '{ firstName: string; lastName: string; }'.
    name: "Tulips",
};
const poemMatch2 = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};
// name not provided and no error occured 
const poemMismatch3 = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    // name: "Lady Lazarus",
};
// Ok: author is provided as undefined
const hasRequired = {
    author: undefined,
};
const missingRequired = {};
// ~~~~~~~~~~~~~~~
// Error: Property 'author' is missing in type
// '{}' but required in type 'Writers'.
// Unions of Objects
// Inferred Object-Type Unions
// If a variable is given an initial value that could be one of multiple object types,
// TypeScript will infer its type to be a union of object types.
const poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
// Type:
// {
// name: string;
// pages: number;
// rhymes?: undefined;
// }
// |
// {
// name: string;
// pages?: undefined;
// rhymes: boolean;
// }
poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined
const poem1 = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
poem1.name; // Ok
poem1.pages;
// ~~~~~
// Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
poem1.rhymes;
// Now, consider a function that accepts either an Admin or a User:
function printInfo(person) {
    if ("privileges" in person) {
        console.log("Admin privileges:", person.privileges);
    }
    else {
        console.log("User email:", person.email);
    }
}
function printSale(sale) {
    if (typeof sale.description === "string") {
        console.log("Sale description:", sale.description);
    }
    else {
        console.log("No description available.");
    }
}
//Narrowing with instanceof
class Dog {
    bark() {
        console.log("Woof!");
    }
}
class Cat {
    meow() {
        console.log("Meow!");
    }
}
function speak(animal) {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows this is a Dog
    }
    else {
        animal.meow(); // TypeScript knows this is a Cat
    }
}
function isFish(pet) {
    return pet.swim !== undefined;
}
// The isFish function is a type predicate: 
// it tells TypeScript that if isFish(pet) returns true, 
//then pet is of type Fish.
//Now you can use isFish to narrow down the type in a function:
function move(pet) {
    if (isFish(pet)) {
        pet.swim(); // TypeScript knows this is a Fish
    }
    else {
        pet.fly(); // TypeScript knows this is a Bird
    }
}
function area(shape) {
    if (shape.kind === "square") {
        return shape.size * shape.size;
    }
    else {
        return Math.PI * shape.radius * shape.radius;
    }
}
const employee = {
    name: "John Doe",
    employeeId: 12345,
};
const example = {
    value: "string", // Error: Type 'string' is not assignable to type 'never'
};
const adminUser = {
    name: "Alice",
    privileges: ["manage_users"],
    email: "alice@example.com",
};
const vehicle = {
    model: "AmphiCar",
    start() {
        console.log("Starting car...");
    },
    sail() {
        console.log("Sailing boat...");
    },
};
const config = {
    mode: "dark", // Error: Type 'dark' is not assignable to type 'never'.
    size: 10, //Type 'number' is not assignable to type 'never'.ts(2322)
    scale: 2, //Type 'number' is not assignable to type 'never'.ts(2322)
};
const config2 = {
    mode: "dark",
    size: 10,
};
//Use Type Guards to Narrow Down Types: When dealing with intersection types where some properties may conflict, you can use type guards to ensure you're accessing properties in a safe manner.
function isCar(vehicle) {
    return vehicle.start !== undefined;
}
function move1(vehicle) {
    if (isCar(vehicle)) {
        vehicle.start(); // Safe to call start() here
    }
    else {
        vehicle.sail(); // Safe to call sail() here
    }
}
