import type { Config } from 'jest';
import path from 'path';

const config: Config = {
  rootDir: path.join(__dirname, '../'),
  roots: [path.join(__dirname, '../src')],
  displayName: 'jest',
  // Add TypeScript-specific configuration
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

export default config;