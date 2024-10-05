"use strict";
// Enums (short for enumerations) allow you to define a set
//  of named constants, which can be either numeric or string.
//   They are useful when you need to represent a set of predefined
//    values for a variable, such as status codes, response types, etc.
//1:Numeric Enum:
var ServerResponseStatus;
(function (ServerResponseStatus) {
    ServerResponseStatus[ServerResponseStatus["Success"] = 0] = "Success";
    ServerResponseStatus[ServerResponseStatus["Error"] = 1] = "Error";
})(ServerResponseStatus || (ServerResponseStatus = {}));
function getServerResponse() {
    return {
        result: ServerResponseStatus.Success,
        data: ['Item 1', 'Item 2']
    };
}
const response = getServerResponse();
console.log(response);
/*
{
    result: 0,   // `Success` corresponds to the numeric value `0`
    data: ['Item 1', 'Item 2']
} */
/*
//Numeric Enums:
enum Status {
    Success, // 0
    Error,   // 1
}
enum Status {
    Success = 1, // 1
    Error = 5,   // 5
}
String Enums:
enum Status {
  Success = "Success",
  Error = "Error",
}
*/
// String Enum Example
var ServerResponseStatus1;
(function (ServerResponseStatus1) {
    ServerResponseStatus1["SuccessMsg"] = "Success";
    ServerResponseStatus1["ErrorMsg"] = "Error";
})(ServerResponseStatus1 || (ServerResponseStatus1 = {}));
// Correct way to iterate over enum values
// Manually iterate through enum values (without Object.values)
for (const key in ServerResponseStatus1) {
    if (ServerResponseStatus1.hasOwnProperty(key)) {
        const value = ServerResponseStatus1[key];
        console.log(value); // Logs "Success" and "Error"
    }
}
// Function returning a response with the enum type
function getServerResponse1() {
    return {
        result1: ServerResponseStatus1.SuccessMsg,
        data: ['Item 1', 'Item 2'],
    };
}
// Get and log the response
const response1 = getServerResponse1();
console.log(response1);
/**
 * Expected output:
 * {
 *   result1: "Success",  // Now it's a string value
 *   data: ['Item 1', 'Item 2']
 * }
 */
// challenge
var UserRole;
(function (UserRole) {
    UserRole[UserRole["Admin"] = 0] = "Admin";
    UserRole[UserRole["Manager"] = 1] = "Manager";
    UserRole[UserRole["Employee"] = 2] = "Employee";
})(UserRole || (UserRole = {}));
const createUSer = (userObj) => {
    return userObj;
};
const userAlamin = {
    id: 21345,
    name: "Alamin",
    contact: ["alimagoti96@gmail.com", "245695490"],
    role: UserRole.Admin
};
createUSer(userAlamin);
