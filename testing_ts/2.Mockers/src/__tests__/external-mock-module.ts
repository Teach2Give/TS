import thumbWar from '../thumb-war';
import getWinner from '../utils'; // Import the default export

jest.mock('../utils'); // Automatically mocks the utils module

test('returns winner', () => {
  // Set a mock implementation for the default export
  (getWinner as jest.Mock).mockImplementation((p1: string, p2: string) => p1);

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
  
  // Assertions
  expect(winner).toBe('Kent C. Dodds');
  expect((getWinner as jest.Mock).mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ]);

  // Additional assertions
  expect(getWinner).toHaveBeenCalledTimes(2);
  expect(getWinner).toHaveBeenNthCalledWith(1, 'Kent C. Dodds', 'Ken Wheeler');
  expect(getWinner).toHaveBeenNthCalledWith(2, 'Kent C. Dodds', 'Ken Wheeler');

  // Cleanup
  (getWinner as jest.Mock).mockReset();
});
