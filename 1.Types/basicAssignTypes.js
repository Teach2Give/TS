"use strict";
// string 
const myName = "Alamin";
// number
const marksKiswahili = 349;
//boolean
const isMarried = true;
//array 
const hobbies = ['Programming', 'Cooking'];
// tuples
const adress = ["Alamin", 23];
//enums
//an enum is a way of giving more friendly names to sets of numeric values
var Color;
(function (Color) {
    Color[Color["Gray"] = 0] = "Gray";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 100] = "Green";
    Color[Color["Blue"] = 101] = "Blue";
    Color[Color["Yellow"] = 102] = "Yellow";
})(Color || (Color = {}));
