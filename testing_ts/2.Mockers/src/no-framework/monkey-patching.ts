import assert from 'assert';
import thumbWar from '../thumb-war';
import getWinner from '../utils';

// Save the original `getWinner` function
const originalGetWinner = getWinner;

// Override `getWinner` with a mock implementation
const mockGetWinner = (p1: string, p2: string): string => p1;
jest.mock('../utils', () => ({
    __esModule: true, 
    default: jest.fn((p1: string, p2: string) => mockGetWinner(p1, p2))
}));

// Run the test
const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
assert.strictEqual(winner, 'Kent C. Dodds');

// Verify that the mock was called twice
expect((getWinner as jest.Mock).mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
]);

// Cleanup: Restore the original `getWinner` function
(getWinner as jest.Mock).mockRestore();
