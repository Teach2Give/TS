// Import required modules
import * as assert from 'assert';
import thumbWar from '../thumb-war';
import * as utils from '../utils';

// Prime the cache for mocking
const utilsPath = require.resolve('../utils');
const mockUtilsPath = require.resolve('../__no-framework-mocks__/utils');

// Mock the module in the cache
require.cache[utilsPath] = require.cache[mockUtilsPath];

// Run the thumbWar function and assert the output
const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
assert.strictEqual(winner, 'Kent C. Dodds');
assert.deepStrictEqual((utils as any).getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler']
]);

// Cleanup the module cache
delete require.cache[utilsPath];
