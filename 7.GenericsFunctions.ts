// function createString(arg: string):string {
//     return arg
// }

// function createNumber(arg: string):string {
//     return arg
// }

//generic function
function createType<T>(arg: T): T {
  return arg;
}
const firstString1 = createType("Hello World");
const firstNumber1 = createType(123); 

// generic interface 
interface GenericInterface<T>{
    value:T;
    getValue: () => T
}

const genericString:GenericInterface<String> = {
    value: 'Hello World',
    getValue() {
        return this.value
    }
}