
// Iteration 1 : 
//  - A password is invalid if: 
//   . length is less than 8 characters
//   . has no upper case letter 
//   . has no lower case letter 

// - iteration two  - return the reasons for invalidit 
// - Iteration three: admin password should contain a number   
// Enum PassWordErrors: Provides clear, consistent error messages.
// CheckResult Interface: Defines the structure of the response with a valid flag and reasons array.
// The checkPassword method checks all conditions and returns an object with the validity and reasons for any failures.

// export enum PassWordErrors {
//     SHORT = 'Password is too short',
//     NO_UPPER_CASE = 'Password must contain at least one uppercase letter',
//     NO_LOWER_CASE = 'Password must contain at least one lowercase letter',
//     NO_NUMBER = 'Password must contain at least one number'
// }

// export interface CheckResult {
//     valid: boolean;
//     reasons: string[];
// }

// export class PasswordChecker {
//     public checkPassword(password: string): CheckResult {
//         let reasons: string[] = [];

//         // Check password length first
//         // Early Return for Length Check: If the password is shorter than 8 characters, it immediately adds the corresponding reason and returns the result without checking other conditions
//         if (password.length < 8) {
//             reasons.push(PassWordErrors.SHORT);
//             return {
//                 valid: false,
//                 reasons: reasons
//             };
//         }

//         // Check for uppercase letters
//         if (password === password.toLowerCase()) {
//             reasons.push(PassWordErrors.NO_UPPER_CASE);
//         }

//         // Check for lowercase letters
//         if (password === password.toUpperCase()) {
//             reasons.push(PassWordErrors.NO_LOWER_CASE);
//         }

//         // For admin passwords, ensure at least one number is present
//         if (!/\d/.test(password)) {
//             reasons.push(PassWordErrors.NO_NUMBER);
//         }

//         return {
//             valid: reasons.length === 0,
//             reasons: reasons
//         };
//     }
// }



//refactor  
export enum PassWordErrors {
    SHORT = 'Password is too short',
    NO_UPPER_CASE = 'Password must contain at least one uppercase letter',
    NO_LOWER_CASE = 'Password must contain at least one lowercase letter',
    NO_NUMBER = 'Password must contain at least one number'
}

export interface CheckResult {
    valid: boolean;
    reasons: string[];
}

export class PasswordChecker {
    public checkPassword(password: string): CheckResult {
        let reasons: string[] = [];

        // Check for length first
        this.checkForLength(password, reasons);
        
        // If password is too short, return early
        if (reasons.length > 0) {
            return {
                valid: false,
                reasons: reasons
            };
        }

        // Proceed with other checks if length is valid
        this.checkForUpperCase(password, reasons);
        this.checkForLowerCase(password, reasons);
        this.checkForNumber(password, reasons);

        return {
            valid: reasons.length === 0,
            reasons: reasons
        };
    }

    private checkForLength(password: string, reasons: string[]): void {
        if (password.length < 8) {
            reasons.push(PassWordErrors.SHORT);
        }
    }

    private checkForUpperCase(password: string, reasons: string[]): void {
        if (password === password.toLowerCase()) {
            reasons.push(PassWordErrors.NO_UPPER_CASE);
        }
    }

    private checkForLowerCase(password: string, reasons: string[]): void {
        if (password === password.toUpperCase()) {
            reasons.push(PassWordErrors.NO_LOWER_CASE);
        }
    }

    private checkForNumber(password: string, reasons: string[]): void {
        if (!/\d/.test(password)) {
            reasons.push(PassWordErrors.NO_NUMBER);
        }
    }
}
