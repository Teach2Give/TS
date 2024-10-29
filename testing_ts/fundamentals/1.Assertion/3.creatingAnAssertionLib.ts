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


function test(description:string, callback: () => void) {
    try {
        callback();
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(error);
    }
}


//Using test to structure tests
import { sum, sub } from "./1";

test("sum of 3 and 7 should be 10", () => {
    const result = sum(3, 7);
    const expected = 10;
    expect(result).toBe(expected);
});

test("subtraction of 7 from 13 should be 6", () => {
    const result = sub(13, 7);
    const expected = 6;
    expect(result).toBe(expected);
});

test("subtraction of 3 from 3 should be 0", () => {
    const result = sub(3, 3);
    const expected = 0;
    expect(result).toEqual(expected);
});
