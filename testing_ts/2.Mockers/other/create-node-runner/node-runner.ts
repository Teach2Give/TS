import { Worker } from 'jest-worker';
import { fail, pass } from 'create-jest-runner';

interface TestResult {
  path: string;
  errorMessage?: string;
  title?: string;
}

interface RunnerOptions {
  testPath: string;
}

interface WorkerInterface extends Worker {
  require: (path: string) => Promise<any>;
  getStdout: () => NodeJS.ReadableStream;
  getStderr: () => NodeJS.ReadableStream;
}

const runTest = async ({ testPath }: RunnerOptions) => {
  const worker = new Worker(
    require.resolve('./require-module')
  ) as WorkerInterface;

  worker.getStdout().pipe(process.stdout);
  worker.getStderr().pipe(process.stderr);
  process.stdout.write('\n');

  const start = Date.now();

  try {
    await worker.require(testPath);
    
    return pass({
      start,
      end: Date.now(),
      test: { path: testPath }
    });
  } catch (error) {
    const err = error as Error;
    
    return fail({
      start,
      end: Date.now(),
      test: {
        path: testPath,
        errorMessage: err.message,
        title: `Test failure: \n${err.message}`
      }
    });
  }
};

export = runTest;