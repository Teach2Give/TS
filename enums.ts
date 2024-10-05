// Enums (short for enumerations) allow you to define a set
//  of named constants, which can be either numeric or string.
//   They are useful when you need to represent a set of predefined
//    values for a variable, such as status codes, response types, etc.

//1:Numeric Enum:
enum ServerResponseStatus {
    Success,
    Error,
}
// In the example, ServerResponseStatus is a numeric enum where 
// Success is assigned the numeric value 0 by default, and Error 
// gets 1. This default behavior assigns values starting from 0
//  for the first member and increments by 1 for each subsequent member.
// ServerResponseStatus.Success equals 0.
// ServerResponseStatus.Error equals 1.

interface ServerResonse {
    //type of an enum
    result: ServerResponseStatus;
    data: string[];
}

function getServerResponse(): ServerResonse {
    return {
        result: ServerResponseStatus.Success,
        data: ['Item 1', 'Item 2']
    }
}

const response: ServerResonse = getServerResponse()
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
enum ServerResponseStatus1 {
    SuccessMsg = "Success",
    ErrorMsg = "Error",
}

// Correct way to iterate over enum values
// Manually iterate through enum values (without Object.values)
for (const key in ServerResponseStatus1) {
    if (ServerResponseStatus1.hasOwnProperty(key)) {
        const value = ServerResponseStatus1[key as keyof typeof ServerResponseStatus1];
        console.log(value);  // Logs "Success" and "Error"
    }
}

// Interface using the enum
interface ServerResonse1 {
    result1: ServerResponseStatus1; // Now holds a string enum
    data: string[];
}

// Function returning a response with the enum type
function getServerResponse1(): ServerResonse1 {
    return {
        result1: ServerResponseStatus1.SuccessMsg,
        data: ['Item 1', 'Item 2'],
    };
}

// Get and log the response
const response1: ServerResonse1 = getServerResponse1();
console.log(response1);

/**
 * Expected output:
 * {
 *   result1: "Success",  // Now it's a string value
 *   data: ['Item 1', 'Item 2']
 * }
 */


// challenge
enum UserRole {
    Admin,
    Manager,
    Employee,
}

type  User2 =  {
    id: number;
    name:string;
    role: UserRole;
    contact: [string, string]; // Tuple for contact info (email, phone)
}

const createUSer = (userObj: User2): User2 => {
    return userObj
}

const userAlamin: User2 = {
    id: 21345,
    name: "Alamin",
    contact: ["alimagoti96@gmail.com", "245695490"],
    role: UserRole.Admin
}
createUSer(userAlamin)