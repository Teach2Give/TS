///type assertions is to give a type to aNY
let someValue: any = 'This is a string'
let strLeng: number = (someValue as string).length

type Bird1 =  {
    name: string;
}

let birdString = '{"name": "Eagle}'
let dogString = '{"breed": "Poodle}'

//  right niw the types are any 
//let birdObj: any
let birdObj = JSON.parse(birdString)
let dogObj = JSON.parse(birdString)

// to fix the type any 
let bird = birdObj as Bird1
// now its not type any but let  bed: Bird1

let dog = dogObj as Bird1

console.log(bird.name); // Eagle
console.log(dog.name); // undefined 
// there was no error accesing dog.name 
// but returned undefined be careful 
// this is beciuase let dogString = '{"breed": "Poodle}'
// dog string contains breed and not name 

enum Status {
    Pending = 'pending',
    Declined = 'declined'
}

type User3 = {
    name: string;
    status: Status;
}

// save Status.Pending in the DB as a string 
// retrieve string from DB 
const statusValue = 'pending'

// user instance as per the type
const user: User3 = {
    name: 'Ali',
    status: statusValue,
// Type '"pending"' is not assignable to type 'Status'.ts(2322)
}

// Typescript is complaining since status in User3 is 
// status: Status;
// eveon though we know retriveing it from Database comes as a string 
// TS says no, it should be of type Status

// now how do you solve this issue, 
// this is where type assertions is importsant now 
const user4: User3 = {
    name: 'Ali',
    status: statusValue as Status,
// solve it with type assertions 
// we told typescript we know what the type is more than you actually 
}
