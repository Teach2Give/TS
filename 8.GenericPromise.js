"use strict";
// In TypeScript, a generic Promise allows you to specify the type of the value that the promise will resolve to. This helps ensure type safety when working with asynchronous code, as TypeScript can infer and check the type of the resolved value.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const promise = new Promise((resolve, reject) => {
    // Asynchronous operation
});
// Here, T is the generic type that represents the type of value the promise will resolve with.
// Let’s say we want to create a promise that resolves with a string value:
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched successfully!");
        }, 1000);
    });
};
fetchData().then((data) => {
    console.log(data); // "Data fetched successfully!"
});
const fetchUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = {
                id: 1,
                name: "John Doe",
                email: "john.doe@example.com",
            };
            resolve(user);
        }, 1000);
    });
};
// Promise<User>: The promise will resolve to a User object.
// Inside the promise, we simulate fetching user data and then resolve the promise with a User.
fetchUser().then((user) => {
    console.log(user.name); // "John Doe"
});
// Promise with Generic Function
//This makes the function flexible to handle promises that can resolve to different types.
function asyncOperation(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    });
}
// <T>: The generic type placeholder allows the function to accept any type T.
// The function takes a value of type T and returns a promise that resolves with the same type T.
asyncOperation(42).then((result) => {
    console.log(result); // 42
});
asyncOperation("Hello").then((result) => {
    console.log(result); // "Hello"
});
// when using async functions in TypeScript, the return type of the function is always a Promise. Even if you're returning a plain value (e.g., a string or an object), TypeScript expects the return type to be wrapped in a Promise. If you don't explicitly specify the return type as Promise, TypeScript may throw an error or infer it incorrectly.
// Here’s why: async functions automatically return a Promise — even if you're returning a value directly, it's wrapped in a Promise behind the scenes. So you need to specify the return type as Promise<T> where T is the type of the value that the function will eventually resolve to.
function fetchMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        return "Hello, TypeScript!";
    });
}
//right click and choose type definition
//shows return a type of promise
//we need a Promise type Generic when using async on a function
const result = fetchMessage();
function fetchMessage1() {
    return __awaiter(this, void 0, void 0, function* () {
        return "Hello, TypeScript!";
    });
}
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return { id: 1, name: "John Doe" };
    });
}
// Return type: The return type is Promise<User>, meaning the function will resolve to a User object.
// If you just return the User object without wrapping it in a Promise, TypeScript understands it as a promise because of the async keyword.
