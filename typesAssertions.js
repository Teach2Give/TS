"use strict";
///type assertions is to give a type to aNY
let someValue = 'This is a string';
let strLeng = someValue.length;
let birdString = '{"name": "Eagle}';
let dogString = '{"breed": "Poodle}';
//  right niw the types are any 
//let birdObj: any
let birdObj = JSON.parse(birdString);
let dogObj = JSON.parse(birdString);
// to fix the type any 
let bird = birdObj;
// now its not type any but let  bed: Bird1
let dog = dogObj;
console.log(bird.name); // Eagle
console.log(dog.name); // undefined 
// there was no error accesing dog.name 
// but returned undefined be careful 
// this is beciuase let dogString = '{"breed": "Poodle}'
// dog string contains breed and not name 
var Status;
(function (Status) {
    Status["Pending"] = "pending";
    Status["Declined"] = "declined";
})(Status || (Status = {}));
// save Status.Pending in the DB as a string 
// retrieve string from DB 
const statusValue = 'pending';
// user instance as per the type
const user = {
    name: 'Ali',
    status: statusValue,
    // Type '"pending"' is not assignable to type 'Status'.ts(2322)
};
// Typescript is complaining since status in User3 is 
// status: Status;
// eveon though we know retriveing it from Database comes as a string 
// TS says no, it should be of type Status
// now how do you solve this issue, 
// this is where type assertions is importsant now 
const user4 = {
    name: 'Ali',
    status: statusValue,
    // solve it with type assertions 
    // we told typescript we know what the type is more than you actually 
};
