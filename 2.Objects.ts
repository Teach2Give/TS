// objcet literal creation {...} - obj['key'] or obj.key

const poet = {
    born: 1956,
    name: "Mary Wendo"
}
poet["born"] // Type: number
poet.name // Type: string

// tryong to access an unavailable eber leads to an error
// poet.end
// Property 'end' does not exist on type '{ born: number; name: string; }'.ts(2339)


// declaring object types  
// const objectNameType: { key:type; key1:type; key3:type}
let poetLater: {
    born: number;
    name: string;
}

// you can not utilize a value as a type
//'poetLater' refers to a value, but is being used as a type here.
// Did you mean 'typeof poetLater'?
/*
const poetStd: poetLater =  {
} */

// insstead we can use it like this 
const poetStd: typeof poetLater = {
    born: 2029,
    name: "Gamal"
}

// Aliased Object Types
// Constantly writing out object types like { born: number; name: string; } would
// get tiresome rather quickly. It’s more common to use type aliases to assign each type
// shape a name.

type Book = {
    title: string;
    publisher: string;
    year: number;
}

// we can now create two books or even more  
const FullStackReact: Book = {
    title: "Fullstack React",
    publisher: "John Fuller",
    year: 2024
}

const FullStackVue: Book = {
    title: "Fullstack Vue",
    publisher: "Fatmah Adillah",
    year: 2024
}

// type Alias are similar to interfaces
// Structural Typing 
// if an object has the necessary properties of a particular type,
// it is considered to be of that type—even if it wasn’t explicitly declared as such.
type WithFirstName = {
    firstName: string;
};

type WithLastName = {
    lastName: string;
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
let withFirstName: WithFirstName = hasBoth;  // Ok, because hasBoth has a `firstName` property
let withLastName: WithLastName = hasBoth;    // Ok, because hasBoth has a `lastName` property



//Usage checking  
// usage checking ensures that when you assign
//  an object to a location(like a variable or function parameter)
//   that is annotated with a specific type, the object must match
//    the structure and types required by that type.
//     If the object is missing required properties 
//     or has properties of the wrong type,
//     TypeScript will issue a type error.
type FirstAndLastNames = {
    first: string;
    last: string;
};
// Now, you provide an object hasBoth that has both required properties:
const hasBoth2: FirstAndLastNames = {
    first: "Sarojini",
    last: "Naidu",
}; // Ok
// Since hasBoth includes both first and last properties as strings, TypeScript accepts it as valid.

//However, if you try to assign an object like hasOnlyOne
// that is missing the last property, TypeScript will throw an error:
const hasOnlyOne2: FirstAndLastNames = {
    first: "Sappho",
};
// Error: Property 'last' is missing in type '{ first: string; }' 
// but required in type 'FirstAndLastNames'.

//Example 2: Type Mismatches
// TypeScript also checks that each property is of the correct type
type TimeRange = {
    start: Date;
};

const hasStartString: TimeRange = {
    start: "1879-02-13",
    // Error: Type 'string' is not assignable to type 'Date'.
};



// Excess Property Checking
// Typescript will report a type error if a variable is declared with an object type and its
// initial value has more fields than its type describes.
type Poet = {
    born: number;
    name: string;
}
// Ok: all fields match what's expected in Poet
const poetMatch: Poet = {
    born: 1928,
    name: "Maya Angelou"
};
const extraProperty: Poet = {
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
const extraPropertyButOk: Poet = existingObject; // Ok


// Nested Object Types
type Poem = {
    author: {
        firstName: string;
        lastName: string;
    },
    name: string;
}

const poemMatch: Poem = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};

const poemMismatch: Poem = {
    author: {
        name: "Sylvia Plath",
    },
    // Error: Type '{ name: string; }' is not assignable
    // to type '{ firstName: string; lastName: string; }'.
    // Object literal may only specify known properties, and 'name'
    // does not exist in type '{ firstName: string; lastName: string; }'.
    name: "Tulips",
};



// Another way of writing the type Poem 
// would be to extract out the author property’s
//shape into its own aliased object type, Author

type Author = {
    firstName: string;
    lastName: string;

}
type PoemInfo = {
    author: Author;
    name: string;
}

const poemMatch2: PoemInfo = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    name: "Lady Lazarus",
};


// Optional Properties

type Author2 = {
    firstName: string;
    lastName: string;

}
type PoemInfo2 = {
    author: Author;
    name?: string;
}

// name not provided and no error occured 
const poemMismatch3: PoemInfo2 = {
    author: {
        firstName: "Sylvia",
        lastName: "Plath",
    },
    // name: "Lady Lazarus",
};

// n. A property declared as optional
// with ? is allowed to not exist. 
// A property declared as required and | undefined must
// exist, even if the value is undefined.
type Writers = {
    author: string | undefined;
    editor?: string;
};
// Ok: author is provided as undefined
const hasRequired: Writers = {
    author: undefined,
};
const missingRequired: Writers = {};
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

//Explicit Object-Type Unions
//type system will only allow access
//to properties that exist on all of those union types.
//Accessing names is
//allowed because it always exists, 
//but pages and rhymes aren’t guaranteed to exist
type PoemWithPages = {
    name: string;
    pages: number;
};
type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};
type Poem2 = PoemWithPages | PoemWithRhymes;
const poem1: Poem2 = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
poem1.name; // Ok
poem1.pages;
// ~~~~~
// Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
poem1.rhymes;
// ~~~~~~
// Property 'rhymes' does not exist on type 'Poem'.
// Property 'rhymes' does not exist on type 'PoemWithPages'.


// Narrowing objects types 
// Type narrowing refers to the process of refining or 
// "narrowing down" a variable's type from a more general
//  type to a more specific type, based on the context in
//   which it's used. TypeScript can use type guards 
//   and other checks to help you narrow down an object's
//    type. This is useful when dealing with union types
//     or when you need to ensure that specific properties 
//     exist before accessing them.


//Example 1: Narrowing with in Operator
type Admin = {
    role: "admin";
    privileges: string[];
};

type User = {
    role: "user";
    email: string;
};
// Now, consider a function that accepts either an Admin or a User:
function printInfo(person: Admin | User) {
    if ("privileges" in person) {
        console.log("Admin privileges:", person.privileges);
    } else {
        console.log("User email:", person.email);
    }
}

// Example 2: Narrowing with typeof
// For primitive types, such as strings or numbers,
// you can use the typeof operator to narrow down the type. 
//However, it’s also possible to use typeof to narrow an object’s property type.
type Sale = {
    amount: number;
    description?: string;
};

function printSale(sale: Sale) {
    if (typeof sale.description === "string") {
        console.log("Sale description:", sale.description);
    } else {
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

function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark(); // TypeScript knows this is a Dog
    } else {
        animal.meow(); // TypeScript knows this is a Cat
    }
}


// Narrowing with Type Predicates (is keyword)
// This is particularly useful for more complex narrowing,
// where you want to ensure an object has a specific shape.
// Union Type
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
// The isFish function is a type predicate: 
// it tells TypeScript that if isFish(pet) returns true, 
//then pet is of type Fish.

//Now you can use isFish to narrow down the type in a function:
function move(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim(); // TypeScript knows this is a Fish
    } else {
        pet.fly(); // TypeScript knows this is a Bird
    }
}

// Narrowing with Discriminated Unions
// discriminant
type Square = {
    kind: "square";
    size: number;
};

type Circle = {
    kind: "circle";
    radius: number;
};

type Shape = Square | Circle;

function area(shape: Shape) {
    if (shape.kind === "square") {
        return shape.size * shape.size;
    } else {
        return Math.PI * shape.radius * shape.radius;
    }
}



// Intersection of Objects in Typescript 
// In TypeScript, intersection types allow you to combine multiple types into one
// An intersection type means that the resulting type must satisfy all of the combined types. 
// When you intersect object types, the resulting type must have all the properties of both object types
//This is often useful for merging types but can lead to problems if the types you're intersecting contain conflicting properties.
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
    name: "John Doe",
    employeeId: 12345,
};

// Here, EmployeePerson is an intersection of Person and Employee.
// The resulting type must have both the name (from Person) and employeeId (from Employee) properties.

// Potential Dangers of Intersection
// 1. Conflicting Property Types
//2. incompatible types.


//1> conflicting prop types
// When two types have the same property name but different
// types for that property, intersecting them can lead to problems
type A = {
    value: string;
};

type B = {
    value: number;
};

type AandB = A & B;

const example: AandB = {
    value: "string",  // Error: Type 'string' is not assignable to type 'never'
};

// In this example, AandB is an intersection of A and B, both of which have a property value but with different types (string and number).
// The result is a conflict because TypeScript cannot determine a valid type for value. The intersection of string and number results in the type never, which means no valid value can exist that satisfies both types at the same time.
// The danger here is that such conflicts can lead to impossible types (like never), causing errors or unexpected behavior.


// 2. Excessive Property Requirements
// When you intersect two object types, 
//the result must have all the properties of both types,
// which can be too restrictive in some cases.

type Admin1 = {
    name: string;
    privileges: string[];
};

type User1 = {
    name: string;
    email: string;
};

type AdminUser = Admin1 & User1;

const adminUser: AdminUser = {
    name: "Alice",
    privileges: ["manage_users"],
    email: "alice@example.com",
};

// AdminUser must have the properties name, privileges, and email.
// This can lead to overly strict types if you only need some of the properties in different situations.
//n real-world applications, combining such types can make it difficult to work with data because every object must fulfill all the requirements, even when they might not be needed.

// 3. Accidental Property Overlap
// Sometimes, properties overlap without causing an immediate type conflict, 
// but it can lead to confusion or subtle bugs.
type Car = {
    model: string;
    start: () => void;
};

type Boat = {
    model: string;
    sail: () => void;
};

type AmphibiousVehicle = Car & Boat;

const vehicle: AmphibiousVehicle = {
    model: "AmphiCar",
    start() {
        console.log("Starting car...");
    },
    sail() {
        console.log("Sailing boat...");
    },
};

// This code works fine because Car and Boat share a model property with the same type (string), so there's no conflict.
// However, the developer has to remember that model now comes from both types. In larger codebases, this overlap can cause confusion, 
// especially when methods like start and sail exist side by side and aren't related.

//Example of Complex Intersection Issues
// Consider the following more complex example where conflicting types and properties lead to difficult-to-debug issues:
type ConfigA = {
    mode: "dark";
    size: number;
};

type ConfigB = {
    mode: "light";
    scale: number;
};

type ConfigAB = ConfigA & ConfigB;

const config: ConfigAB = {
    mode: "dark", // Error: Type 'dark' is not assignable to type 'never'.
    size: 10, //Type 'number' is not assignable to type 'never'.ts(2322)
    scale: 2, //Type 'number' is not assignable to type 'never'.ts(2322)
};


//Strategies to Avoid Dangers
// Check for Property Conflicts: Always ensure that when combining object types, you don't have conflicting property names with different types.

// Use Union Types if Appropriate: Sometimes, a union type (A | B) might be more appropriate than an intersection (A & B). Union types allow you to handle objects that could be either one type or another.
type Config = ConfigA | ConfigB;

const config2: Config = {
  mode: "dark",
  size: 10,
};


//Use Type Guards to Narrow Down Types: When dealing with intersection types where some properties may conflict, you can use type guards to ensure you're accessing properties in a safe manner.
function isCar(vehicle: Car | Boat): vehicle is Car {
    return (vehicle as Car).start !== undefined;
  }
  
  function move1(vehicle: Car & Boat) {
    if (isCar(vehicle)) {
      vehicle.start();  // Safe to call start() here
    } else {
      vehicle.sail();   // Safe to call sail() here
    }
  }
  