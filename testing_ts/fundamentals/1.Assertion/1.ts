//there is a bug here
export const sum = (a: number, b: number) => a - b
export const sub = (a: number, b: number) => a - b

//lets write an autmaed test 

let result = sum(3, 5)
let expected = 8
// if (result !== expected) {
//     throw new Error(`Result is not equl to expected`)
// }

result = sub(7, 3)
expected = 4
if (result !== expected) {
    throw new Error(`Result is not equl to expected`)
}