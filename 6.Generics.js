"use strict";
const arr1 = ["apple", "mango", "banana"];
const arr2 = [1, 2, 3];
const arr3 = [false, true];
// Here, T is a placeholder for whatever type you want the array to store (e.g., string, number, boolean, etc.). This allows you to use methods like pop and push on arrays while maintaining type safety.
// Generics in TypeScript allow you to create reusable components or functions that work with a variety of data types while maintaining type safety. Instead of specifying a concrete type, you define a generic type that can be dynamically determined when the component or function is used. This provides flexibility and helps avoid redundancy.
//Imagine you want to create a function that returns the first element of an array, regardless of the array’s type.
function getFirstElement(arr) {
    return arr[0];
}
// <T>: This is a generic placeholder. It means "this function can handle any type T," and the actual type will be determined when the function is used.
// T[]: This represents an array of type T. It could be an array of strings, numbers, or any other type.
// T: The return type is T, ensuring that the function returns an element of the same type as the array passed in.
const strArr = ["apple", "mango", "banana"];
const numArr = [1, 2, 3];
// TypeScript infers T as 'string'
const firstString = getFirstElement(strArr); // 'apple'
// TypeScript infers T as 'number'
const firstNumber = getFirstElement(numArr); // 1
// In both cases, the function works for different types (string and number), but TypeScript ensures type safety. The function knows that if you pass an array of strings, it will return a string.
//Why Generics?
// Without generics, you’d have to define a separate function for each type, which would be inefficient:
// Generics allow you to write this functionality once, making the code DRY (Don’t Repeat Yourself).
function getFirstStringElement(arr) {
    return arr[0];
}
function getFirstNumberElement(arr) {
    return arr[0];
}
// Using Multiple Generics
// Sometimes, you need more than one generic type. Let’s look at a function that returns a tuple of two different types:
function makePair(a, b) {
    return [a, b];
}
// <T, U>: This function accepts two generic types: T for the first argument and U for the second argument.
// The return type is a tuple [T, U], meaning it returns both values as a pair
const pair = makePair("apple", 5); // ['apple', 5]
const pair2 = makePair(true, "banana"); // [true, 'banana']
// Generic Classes
// Generics can also be used in classes. For example, a Box class that stores  a value of any type:
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
const stringBox = new Box("apple");
console.log(stringBox.getValue()); // 'apple'
const numberBox = new Box(123);
console.log(numberBox.getValue()); // 123
// Constraints with Generics
// You can restrict generics to certain types using constraints. For example, you might want a generic type to only work with types that have certain properties (e.g., objects that have a length property):
function getLength(arg) {
    return arg.length;
}
// T extends { length: number }: This ensures that T must be a type that has a length property (like arrays, strings, etc.).
console.log(getLength([1, 2, 3])); // 3
console.log(getLength("hello")); // 5
