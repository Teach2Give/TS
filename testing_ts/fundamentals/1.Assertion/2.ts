import { sum, sub } from "./1";

let result, expected

result = sum(3,7)
expected = 10 
//assertions
// if (result !== expected) {
//     throw new Error(`${result}  is not equl to ${expected}`)
// }
expect(result).toBe(expected)

result = sub(13,7)
expected = 6 
// if (result !== expected) {
//     throw new Error(`${result}  is not equl to ${expected}`)
// }
expect(result).toBe(expected)


//lets now make the abstraction 
//this is a simple  assertion library 
function expect(actual: number) {
    return {
        toBe(expected: number) {
            if(actual !== expected) {
                throw new Error(`${actual}  is not equl to ${expected}`)
            }
        }
        //we can all have all types of assertions now 
    }
}