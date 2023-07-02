import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

const resultYml = readFile('resultyml.txt');

const file3 = './__fixtures__/file1.yml';
const file4 = './__fixtures__/file2.yml';

const resultplain = readFile('resultplain.txt');
test('exp', () => {
  expect(genDiff(file3, file4)).toEqual(resultYml);
  expect(genDiff(file1, file2)).toEqual(resultplain);
});
