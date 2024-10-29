// Define the basic structure of a mock function
type Mock<T> = T & {
  mock: {
    calls: any[][]
  }
};

// Convert the function with generics
function fn<T extends (...args: any[]) => any>(
  impl: T = (() => {}) as T
): Mock<T> {
  const mockFn = (...args: any[]) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };

  mockFn.mock = { calls: [] };
  return mockFn as Mock<T>;
}

// Export with type information
export const getWinner = fn((p1: string, p2: string) => p1);

// Example usage:
// getWinner("player1", "player2")
// getWinner.mock.calls => [["player1", "player2"]]