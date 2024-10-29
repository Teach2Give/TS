// setup-global.ts
function customExpect(actual: number) {
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
        }
    };
}

async function customTest(description: string, callback: () => Promise<void> | void) {
    try {
        await callback(); // Await in case the callback is asynchronous
        console.log(`✅ ${description}`);
    } catch (error) {
        console.error(`❌ ${description}`);
        console.error(error);
    }
}

globalThis.customTest = customTest;
globalThis.customExpect = customExpect;
