import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils"

// describe('Utils test suite', () => {
//     //put your test 
//     //we can use it or test function  
//     test('should return uppercase', () => {
//         const result = toUpperCase('abc');
//         //now lets make an assertions
//         expect(result).toBe('ABC')
//     })
// })

//using AAA convection 
describe('Utils test suite', () => {


    //demosbtrating JEST HOOKS  
    describe.only('StringUtils tests', () => {
        let sut: StringUtils;
        beforeEach(() => {
            sut = new StringUtils()
            console.log('Setup')
        })
        afterEach(() => {
            //clearing mocks
            console.log('TearDown')
        })

        it.only('it should return correct uppercase', () => {
            const sut = new StringUtils()

            //act
            const actual = sut.toUpperCase('abc')

            //expect
            expect(actual).toBe('ABC')
            console.log('Actual test')
        })

        it('should throw error on invalid argument - function', () => {
            function expectError() {
                const actual = sut.toUpperCase('');
            }
        
            // Expect that the function throws an error
            expect(expectError).toThrow();
            expect(expectError).toThrowError('Invalid argument'); // Update the expected message
        });

        it('should throw error on invalid argument - function 2', () => {
           expect(() => {
            sut.toUpperCase('')
           }).toThrowError('Invalid argument');
        });

        // interface DoneCallback {
        //     (...args: any[]): any;
        //     fail(error?: string | { message: string }): any;
        // }
    
        // // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        // type ProvidesCallback = ((cb: DoneCallback) => void | undefined) | (() => PromiseLike<unknown>);
        it('should throw error on invalid argument - function 3', (done) => {
            try {
                sut.toUpperCase('') //problem with this is if it doesn't throw an error, it wont go to the catch , so we should pass done callback 
                done('GetString Should throw an error for invaid args')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error).toHaveProperty('message', 'Invalid argument')
                done()
            }
         });
        
    })

    //Using it with the AAA approach simplifies the structure and allows tests to communicate their purpose in a human-readable format, making the test suite more maintainable and useful.
    it('should return uppercase of a valid string', () => {
        // Arrange: Set up any required variables or states
        const input = 'abc';
        const expected = 'ABC'
        const sut = toUpperCase

        // Act: Execute the function or method being tested
        const result = sut(input);

        // Assert: Verify the result is as expected
        expect(result).toBe(expected);
    });

    // //it.only - only runs that tests on that file 
    // it('should return info for valid string', () => {
    //     const actual = getStringInfo('My-String')

    //     expect(actual.lowerCase).toBe('my-string')
    //     //this will fail since we can not use toBe(used with primitives) with objects
    //     //we need to use toEqual
    //     // expect(actual.extraInfo).toBe({})
    //     expect(actual.extraInfo).toEqual({})

    //     // expect(actual.characters.length).toBe(9)
    //     //more cleaner
    //     expect(actual.characters).toHaveLength(9)

    //     //testing arrays 
    //     // Match the exact characters, including the correct length and sequence
    //     expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
    //     //check if array has element
    //     expect(actual.characters).toContain('M')
    //     expect(actual.characters).toContain<string>('M')
    //     //checking but not sure of the order
    //     expect(actual.characters).toEqual(
    //         expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
    //     )

    //     // Assertion that extraInfo should not be undefined
    //     expect(actual.extraInfo).not.toBe(undefined);
    //     // This checks that actual.extraInfo is not undefined, meaning it has been assigned some value.
    //     // Useful when ensuring that a value is present.

    //     // Check that extraInfo is not undefined
    //     expect(actual.extraInfo).not.toBeUndefined();        // This assertion checks that actual.extraInfo is exactly undefined.
    //     // It may conflict with the previous line if extraInfo should always have a value.

    //     expect(actual.extraInfo).toBeDefined();
    //     // Checks that actual.extraInfo has been defined. It’s the opposite of .toBeUndefined(),
    //     // and will pass if actual.extraInfo is anything other than undefined.

    //     expect(actual.extraInfo).toBeTruthy();
    //     // Checks that actual.extraInfo is "truthy," meaning it is neither null, undefined, false, 0, NaN, nor an empty string.
    //     // If extraInfo is an object or non-empty value, this will pass.


    // })


    //multiple test structure 
    describe('getStringInfo for args My-String should', () => {
        test('return right length', () => {
            const actual = getStringInfo('My-String')
            expect(actual.characters).toHaveLength(9)
        })

        test('return lower case', () => {
            const actual = getStringInfo('My-String')
            expect(actual.lowerCase).toBe('my-string')
        })

        test('return upper case', () => {
            const actual = getStringInfo('My-String')
            expect(actual.upperCase).toBe('MY-STRING')
        })


        test('return right characters', () => {
            const actual = getStringInfo('My-String')
            expect(actual.characters).toEqual(
                expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
            )
        })

        test('return defined extra  info', () => {
            const actual = getStringInfo('My-String')
            // expect(actual.extraInfo).toBe({})
            expect(actual.extraInfo).toEqual({})
            // Assertion that extraInfo should not be undefined
            expect(actual.extraInfo).not.toBe(undefined);
            // This checks that actual.extraInfo is not undefined, meaning it has been assigned some value.
            // Useful when ensuring that a value is present.

            // Check that extraInfo is not undefined
            expect(actual.extraInfo).not.toBeUndefined();        // This assertion checks that actual.extraInfo is exactly undefined.
            // It may conflict with the previous line if extraInfo should always have a value.

            expect(actual.extraInfo).toBeDefined();
            // Checks that actual.extraInfo has been defined. It’s the opposite of .toBeUndefined(),
            // and will pass if actual.extraInfo is anything other than undefined.

            expect(actual.extraInfo).toBeTruthy();
            // Checks that actual.extraInfo is "truthy," meaning it is neither null, undefined, false, 0, NaN, nor an empty string.
            // If extraInfo is an object or non-empty value, this will pass.


        })
    })


    //parameterized tests 
    // Parameterized test cases using AAA pattern
    describe('toUpperCase', () => {
        it.each([
            ['abc', 'ABC'],
            ['hello', 'HELLO'],
            ['Test', 'TEST'],
            ['', ''],  // Edge case: empty string
            ['123', '123'] // Numeric string case
        ])('should return uppercase of the input string "%s"', (input, expected) => {
            // Arrange: Prepare the function to test and input/output expectations
            const sut = toUpperCase;

            // Act: Call the function with the test input
            const result = sut(input);

            // Assert: Verify the output matches the expected result
            expect(result).toBe(expected);
        });
    });



});


