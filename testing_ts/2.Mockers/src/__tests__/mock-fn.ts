import thumbWar from '../thumb-war';
import getWinner from '../utils'; // Import default export directly

// Mock the `utils` module and provide a mock implementation for `getWinner`
jest.mock('../utils', () => ({
  __esModule: true, // Ensures that Jest treats it as an ES module
  default: jest.fn((p1: string, p2: string) => p1), // Mock implementation
}));

test('returns winner', () => {
  // Run the function under test
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

  // Perform assertions
  expect(winner).toBe('Kent C. Dodds');
  expect((getWinner as jest.Mock).mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler'],
  ]);

  // Additional assertions
  expect(getWinner).toHaveBeenCalledTimes(2);
  expect(getWinner).toHaveBeenNthCalledWith(1, 'Kent C. Dodds', 'Ken Wheeler');
  expect(getWinner).toHaveBeenNthCalledWith(2, 'Kent C. Dodds', 'Ken Wheeler');
});
