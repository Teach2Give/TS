/** @type {import('ts-jest').JestConfigWithTsJest} **/

const baseDir = '<rootDir>/src/app/spies' 
const baseTestDir = '<rootDir>/src/test/spies' 

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    `${baseDir}/**/*.ts`  // Ensure this path points to your source files
  ],
  testMatch: [
    `${baseTestDir}/**/*.ts`
  ]

};