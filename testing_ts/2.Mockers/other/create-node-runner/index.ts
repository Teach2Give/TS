// node-runner.d.ts
import type { Test } from 'jest-runner';

export interface NodeRunnerOptions {
  testPath: string;
  config: any;
  globalConfig: any;
}

export type NodeRunner = (options: NodeRunnerOptions) => Promise<Test>;