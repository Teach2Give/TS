"use strict";
// function createString(arg: string):string {
//     return arg
// }
// function createNumber(arg: string):string {
//     return arg
// }
//generic function
function createType(arg) {
    return arg;
}
const firstString1 = createType("Hello World");
const firstNumber1 = createType(123);
const genericString = {
    value: 'Hello World',
    getValue() {
        return this.value;
    }
};
