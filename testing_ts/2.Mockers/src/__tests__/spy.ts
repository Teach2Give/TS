import thumbWar from '../thumb-war';
import * as utils from '../utils';

interface Utils {
    getWinner: (p1: string, p2: string) => string;
}

describe('thumbWar', () => {
    test('returns winner', () => {
        // Type assertion to help TypeScript understand the utils module structure
        const utils_typed = utils as unknown as Utils;
        
        // Create the spy with proper typing
        const getWinnerSpy = jest
            .spyOn(utils_typed, 'getWinner')
            .mockImplementation((p1: string, p2: string) => p1);

        // Run the thumbWar function
        const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');

        // Assert the winner
        expect(winner).toBe('Kent C. Dodds');
        expect(getWinnerSpy.mock.calls).toEqual([
            ['Kent C. Dodds', 'Ken Wheeler'],
            ['Kent C. Dodds', 'Ken Wheeler']
        ]);

        // Cleanup the mock
        getWinnerSpy.mockRestore();
    });
});