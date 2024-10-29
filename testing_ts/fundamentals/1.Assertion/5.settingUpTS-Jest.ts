
npm install --save-dev jest ts-jest @types/jest
//This will create a jest.config.js file in your project root. You can modify it to look like this:
// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./setup-global.ts'], // Add global setup file
    testMatch: ['**/fundamentals/1.Assertions/**/*.ts'], // Match all .ts files in your test directory
  };
  
  
//   This configuration:

//   Sets up Jest to use ts-jest as a preprocessor.
//   Specifies that tests will run in a Node environment.
//   Loads setup-global.ts (where you define global functions like test and expect) before running any tests.
Step 3: Update setup-global.ts
// setup-global.ts

// Define your expect function with custom matchers
globalThis.expect = function expect(actual: number) {
    return {
        toBe(expected: number) {
            if (actual !== expected) {
                throw new Error(`Expected ${actual} to be ${expected}`);
            }
        },
        toEqual(expected: number) {
            if (actual != expected) {
                throw new Error(`Expected ${actual} to equal ${expected}`);
            }
        },
        toBeGreaterThan(expected: number) {
            if (actual <= expected) {
                throw new Error(`Expected ${actual} to be greater than ${expected}`);
            }
        },
        toBeLessThan(expected: number) {
            if (actual >= expected) {
                throw new Error(`Expected ${actual} to be less than ${expected}`);
            }
        },
    };
};

// Define async test function
globalThis.test = async function test(description: string, callback: () => Promise<void> | void) {
    try {
        await callback();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(error);
    }
};


//Step 4: Run Tests with Jest
//npx ts-jest config:init

