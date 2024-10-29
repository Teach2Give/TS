import type { Config } from 'jest';

const config: Config = {
  projects: ['./other/jest.config.js', './other/jest.no-framework.config.js']
};

export default config;
