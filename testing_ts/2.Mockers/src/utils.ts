// utils.ts
// Returns the winning player or null for a tie.
// Mock this in tests because it relies on Math.random.

function getWinner(player1: string, player2: string): string | null {
    const winningNumber = Math.random();
    return winningNumber < 1 / 3
        ? player1
        : winningNumber < 2 / 3
        ? player2
        : null;
}

export default getWinner;
