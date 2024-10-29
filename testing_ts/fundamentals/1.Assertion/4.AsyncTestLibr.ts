// To make the test function asynchronous, you need to handle the possibility that the callback function returns a Promise. This can be useful if your tests involve asynchronous operations (e.g., API calls, file I/O, or database operations). When the function is asynchronous, the test runner can wait for the test to complete before proceeding.

function expect(actual:number) {
    return {
        toBe(expected:number) {
            if (actual !== expected) {
                throw new Error(`Expected ${actual} to be ${expected}`);
            }
        },
        toEqual(expected:number) {
            if (actual != expected) { // Loose equality
                throw new Error(`Expected ${actual} to equal ${expected}`);
            }
        },
        toBeGreaterThan(expected:number) {
            if (actual <= expected) {
                throw new Error(`Expected ${actual} to be greater than ${expected}`);
            }
        },
        toBeLessThan(expected:number) {
            if (actual >= expected) {
                throw new Error(`Expected ${actual} to be less than ${expected}`);
            }
        }
    };
}

async function test(description: string, callback: () => Promise<void> | void) {
    try {
        await callback(); // Await in case the callback is asynchronous
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(error);
    }
}

// Why use async: When the callback is asynchronous, using await allows the test function to wait for the asynchronous operations to complete. This ensures that any errors thrown within the callback are caught in the try-catch block, which wouldn’t be possible without await.

import { sum, sub } from "./1";

test("async sum of 3 and 7 should be 10", async () => {
    const result = await sum(3, 7); // Assume sum is an async function
    const expected = 10;
    expect(result).toBe(expected);
});

test("async subtraction of 7 from 13 should be 6", async () => {
    const result = await sub(13, 7); // Assume sub is an async function
    const expected = 6;
    expect(result).toBe(expected);
});

//run 
//npx ts-node --require ./setup-global.ts fundamentals/1.Assertion/4.AsyncTestLib.ts



//we can comment out the top code and use the global ts as a mini lib 


//we can now put the gunction utility onto the global and require them any time we need them  - setup-global.ts 
//then we can just run $ npx ts-node --require ./setup-global.ts fundamentals/1.Assertion/4.AsyncTestLibr.ts
