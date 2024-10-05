// const audioElement = document.createElement("audio")
// // 1: auto completion poweres , putting a dot helps auto complete
// audioElement.play

// //Ctrl + Space - manually see suggestions 
// // hitting ctrl + space will give you suggestions 
// //  document.addEventListener()
// // If you wanted to narrow down the list to the events you were interested in, you could type "drag"
// //  before hitting Ctrl + Space and only the appropriate events would display:
// // document.addEventListener(drag)
// const acceptsObj = (obj: { foo: string; bar: number; baz: boolean }) => { };
// acceptsObj({
//     // do ctrl + space
//     bar,
//     baz,
//     foo
// })


// // 2: TypeScript Error Checking
// // If the TypeScript server finds any errors, it will tell VS Code to draw a red squiggly line 
// // under the part of the code that has a problem. Hovering over the underlined code will show 
// // you the error message. Once you make a change, the TypeScript server will check again and 
// // remove the red squiggly line if the error is fixed.

// // 3: Catching Runtime Errors
// // Sometimes TypeScript will warn you about things that will definitely fail at runtime.
// const a = null
// a.string() // earlier warnings 'a' is possibly 'null'.
// // this warning is good so that if makes us understand why we cant call .string() on a
// // Ignoring it leads to - Uncaught TypeError: Cannot read properties of null (reading 'toString').


// // 4: # Warnings About Non-Runtime Errors
// // Not everything TypeScript warns us about will actually fail at runtime.
// const obj = {}
// const result = obj.foo
// // Property 'foo' does not exist on type '{}'.
// // this code will not cause no run time error but Typescript warns us earlier 
// // the result will be undefined  
// // If TypeScript didn't warn us about this, it would be saying that we can access
// // any property on any object at any time. Over the course of an entire application, this could result in quite a few bugs.

// // 5: Warnings Close to the Source of the Problem
// type Album = {
//     artist: string,
//     title: string,
//     year: number
// }

// const album: Album =  {
//     artsist: "Tv",
//     //Object literal may only specify known properties, but 'artsist' does not exist in type 'Album'. Did you mean to write 'artist'?ts(2561)
//     // TypeScript is telling us that we've made a mistake, and even suggests the correct spelling
//     title: "Dior",
//     year: 1994
// }

// // 6: #Dealing With Multi-Line Errors
// // However, sometimes TypeScript will give you an error in a more unhelpful spot.
// const logUserJobTitle = (user: {job : {title: string }}) => {
//     console.log(user.job);
// }

// // we want to pass a user where a title is not a string 
// const exampleUser = {
//     job: {
//         title: 123
//     }
// }
// logUserJobTitle(exampleUser)
// /**
//  Argument of type '{ job: { title: number; }; }' is not assignable to parameter of type '{ job: { title: string; }; }'.
//   The types of 'job.title' are incompatible between these types.
//     Type 'number' is not assignable to type 'string'.
//  */
// // Reading errors bottom-to-top can be a helpful strategy when dealing with multi-line TypeScript errors.

// // 6: #Introspecting Variables and Declarations
// // Any time you hover over a variable or declaration, VS Code will show you information about it.
// let thing   = 23

// let otherThing = {
//     name: "Alice"
// }

// const otherObject = {
//      ...otherThing,
//      thing: "abc"
// }

// otherObject.thing
// // Hovering over otherObject will give us a computed readout of all of its properties:

// let myElement = document.getElementById(12)
// // hovering over 12 leads t understanding
// //     Argument of type 'number' is not assignable to parameter of type 'string'.ts(2769)
// // We'll also get a readout of the getElementById function:
// // (method) Document.getElementById(elementId: string): HTMLElement | null
// // This tells us that we can fix the error by changing the argument to a string:



// // jsDocs commenting
// /**
//  * Logs the value of an object to the console
//  * 
//  * @param obj  - the object to log
//  * 
//  * @example
//  * ```ts
//  * logValues({a:1, b:2});
//  * // output
//  * // a: 1
//  * // b: 2
//  * ```
//  */

// const logValues = (obj: any) => {
//     for(const key in obj) {
//         console.log(`${key}: ${obj[key]}`);
//     }
// }

// //The @param tag is used to describe the parameters of the function. 
// // The @example tag is used to provide an example of how the function can be used, using markdown syntax.
// // see more examples here https://jsdoc.app/ 


// //function to be imported 
// export const addUsers = (user: {email: string, password: string}) => {
// }