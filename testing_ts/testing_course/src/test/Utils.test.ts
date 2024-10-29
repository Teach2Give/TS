import { getStringInfo, toUpperCase } from "../app/Utils"

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

    //it.only - only runs that tests on that file 
    it('should return info for valid string', () => {
        const actual = getStringInfo('My-String')

        expect(actual.lowerCase).toBe('my-string')
        //this will fail since we can not use toBe(used with primitives) with objects
        //we need to use toEqual
        // expect(actual.extraInfo).toBe({})
        expect(actual.extraInfo).toEqual({})

        // expect(actual.characters.length).toBe(9)
        //more cleaner
        expect(actual.characters).toHaveLength(9)

        //testing arrays 
        // Match the exact characters, including the correct length and sequence
        expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g'])
        //check if array has element
        expect(actual.characters).toContain('M')
        expect(actual.characters).toContain<string>('M')
        //checking but not sure of the order
        expect(actual.characters).toEqual(
            expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-'])
        )

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

});


