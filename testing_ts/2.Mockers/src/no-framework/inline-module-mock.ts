import assert from 'assert';
import thumbWar from '../thumb-war';
import getWinner from '../utils';

type MockFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T>;
    mock: {
        calls: Array<Parameters<T>>;
    };
};

function fn<T extends (...args: any[]) => any>(
    impl: T = (() => {}) as T
): MockFunction<T> {
    const mockFn = ((...args: any[]): ReturnType<T> => {
        mockFn.mock.calls.push([...args] as Parameters<T>);
        return impl(...args);
    }) as MockFunction<T>;

    mockFn.mock = { calls: [] };
    return mockFn;
}

// Save the original getWinner function
const originalGetWinner = getWinner;

// Create mock with explicit typing
type GetWinnerType = (p1: string, p2: string) => string;
const mockGetWinner = fn<GetWinnerType>((p1: string, p2: string) => p1);

// Override the original function
(globalThis as any).getWinner = mockGetWinner;

// Run the test
const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual(mockGetWinner.mock.calls, [
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
]);

// Cleanup: Restore the original function
(globalThis as any).getWinner = originalGetWinner;