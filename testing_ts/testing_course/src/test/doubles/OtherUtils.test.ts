import { calculateComplexity, StringInfo } from "../../app/doubles/OtherUtils";

describe('OtherUtils test suite', () => {
    it('Calculates complexity correctly when extraInfo is provided', () => {
        const someInfo: StringInfo = {
            lowerCase: 'example',
            upperCase: 'EXAMPLE',
            length: 7,
            characters: ['e', 'x', 'a', 'm', 'p', 'l', 'e'],
            extraInfo: {
                key1: 'value1',
                key2: 'value2'
            }
        };

        const complexity = calculateComplexity(someInfo);
        expect(complexity).toBe(14); // 2 keys * length 7 = 14
    });

    it('Calculates complexity as 0 when extraInfo is undefined', () => {
        const someInfo: StringInfo = {
            lowerCase: 'test',
            upperCase: 'TEST',
            length: 4,
            characters: ['t', 'e', 's', 't'],
            extraInfo: undefined // No additional information
        };

        const complexity = calculateComplexity(someInfo);
        expect(complexity).toBe(0); // Should return 0 when extraInfo is undefined
    });
});