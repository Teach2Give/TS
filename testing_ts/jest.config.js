module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./setup-global.ts'], // Load global setup file
  testMatch: ['<rootDir>/fundamentals/1.Assertion/**/*.ts'], // Include all .ts files in 1.Assertion as tests
};
