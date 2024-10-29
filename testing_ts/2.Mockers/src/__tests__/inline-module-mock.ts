import thumbWar from '../thumb-war';
import getWinner from '../utils'; // Import the default export

// Mock `getWinner` as the default export of the `utils` module
jest.mock('../utils', () => ({
  __esModule: true,
  default: jest.fn((p1: string, p2: string): string => p1) // Mock implementation
}));

test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

  // Assertions
  expect(winner).toBe('Kent C. Dodds');
  expect((getWinner as jest.Mock).mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ]);

  // Additional assertions for call count and arguments
  expect(getWinner).toHaveBeenCalledTimes(2);
  expect(getWinner).toHaveBeenNthCalledWith(1, 'Kent C. Dodds', 'Ken Wheeler');
  expect(getWinner).toHaveBeenNthCalledWith(2, 'Kent C. Dodds', 'Ken Wheeler');

  // Cleanup
  (getWinner as jest.Mock).mockReset();
});
