// import { PasswordChecker, PassWordErrors } from "../../pass_checker/PasswordChecker";

// describe('PasswordChecker test suite', () => {
//     let sut: PasswordChecker;

//     beforeEach(() => {
//         sut = new PasswordChecker();
//     });

//     it('Password with less than 8 characters is invalid', () => {
//         const actual = sut.checkPassword('1234567');
//         expect(actual).toContain('Password must be at least 8 characters long');
//     });

//     it('Password with more than 8 characters is ok', () => {
//         const actual = sut.checkPassword('12345678Aa');
//         expect(actual).toBe(true);
//     });
    
//     it('Password without an uppercase letter is invalid', () => {
//         const actual = sut.checkPassword('1234cdef');
//         expect(actual).toContain('Password must contain at least one uppercase letter');
//     });

//     it('Password with an uppercase letter is valid', () => {
//         const actual = sut.checkPassword('1234cdefA');
//         expect(actual).toBe(true);
//     });

//     it('Password without a lowercase letter is invalid', () => {
//         const actual = sut.checkPassword('1234ASDF');
//         expect(actual).toContain('Password must contain at least one lowercase letter');
//     });

//     it('Admin password without a number is invalid', () => {
//         const actual = sut.checkPassword('ABcdefgh');
//         expect(actual).toContain('Password must contain at least one number');
//     });

//     it('Valid admin password with all criteria is valid', () => {
//         const actual = sut.checkPassword('Abcdef12');
//         expect(actual).toBe(true);
//     });
// });

import { PasswordChecker, PassWordErrors } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    it('Password with less than 8 characters is invalid', () => {
        const actual = sut.checkPassword('1234567');
        expect(actual).toEqual({
            valid: false,
            reasons: [PassWordErrors.SHORT]
        });
    });

    it('Password with more than 8 characters, uppercase and lowercase is valid', () => {
        const actual = sut.checkPassword('12345678Aa');
        expect(actual).toEqual({
            valid: true,
            reasons: []
        });
    });

    it('Password without an uppercase letter is invalid', () => {
        const actual = sut.checkPassword('1234cdef');
        expect(actual).toEqual({
            valid: false,
            reasons: [PassWordErrors.NO_UPPER_CASE]
        });
    });

    it('Password with an uppercase letter is valid', () => {
        const actual = sut.checkPassword('1234cdefA');
        expect(actual).toEqual({
            valid: true,
            reasons: []
        });
    });

    it('Password without a lowercase letter is invalid', () => {
        const actual = sut.checkPassword('1234ASDF');
        expect(actual).toEqual({
            valid: false,
            reasons: [PassWordErrors.NO_LOWER_CASE]
        });
    });

    it('Admin password without a number is invalid', () => {
        const actual = sut.checkPassword('ABcdefgh');
        expect(actual).toEqual({
            valid: false,
            reasons: [PassWordErrors.NO_NUMBER]
        });
    });

    it('Valid admin password with all criteria is valid', () => {
        const actual = sut.checkPassword('Abcdef12');
        expect(actual).toEqual({
            valid: true,
            reasons: []
        });
    });


    // const createUser = (api)=>(data) { 
    //     // validate data
    //     // build payload
    //     api.call(payload) //<--  now this can be the real thing or a mock we don't know and don't care
    //     // then map result to our needs
    //     // catch and handle results from api
    //   }
      
    // const input = {username: "john"}

    //     const response = {
    //         ts: Date.now(),
    //         id: 999,
    //         name: "john",
    //     }

    //     const apiMock = {
    //         create: jest.fn().mockReturnValue(Promise.resolve(response)),
    //     }

    //     const createdUser = await createUser(apiMock)(input)

    //     const objToMatch = {
    //         id: expect.any(Number),
    //         userName: expect.any(String),
    //         registrationDate: expect.any(Date),
    //        // some other formatting and properties or data manipulation done in our method when we get the response
    //     }
    //     expect(createdUser).toMatchObject(objToMatch)
    // })
});
