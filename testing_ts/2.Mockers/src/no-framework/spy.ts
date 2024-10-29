import assert from 'assert';
import thumbWar from '../thumb-war';
import * as utils from '../utils';
import getWinner from '../utils';


// Save the original `getWinner` function
const originalGetWinner = getWinner;

// Override `getWinner` with a mock implementation
const mockGetWinner = (p1: string, p2: string): string => p1;
jest.mock('../utils', () => ({
    __esModule: true, 
    default: jest.fn((p1: string, p2: string) => mockGetWinner(p1, p2))
}));


// Create a properly typed mock function utility
function fn(impl: (...args: any[]) => any = () => {}): jest.Mock {
    const mockFn = jest.fn(impl);
    
    // Add any additional properties or methods if needed
    const extendedMockFn = mockFn as jest.Mock;
    
    return extendedMockFn;
}

describe('thumbWar', () => {
    test('returns winner', () => {
        // Run the test
        const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
        
        // Assertions
        assert.strictEqual(winner, 'Kent C. Dodds');
        expect((getWinner as jest.Mock).mock.calls).toEqual([
            ['Kent C. Dodds', 'Ken Wheeler'],
            ['Kent C. Dodds', 'Ken Wheeler']
        ]);

        // Cleanup
        (getWinner as jest.Mock).mockRestore();
    });

    // Reset modules after tests
    afterAll(() => {
        jest.resetModules();
    });
});
// For Jest compatibility, if needed
export {};