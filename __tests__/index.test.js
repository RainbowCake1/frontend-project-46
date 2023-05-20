import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const res = readFile('resultjson.txt');

test('json', () => {
  const file1 = './__fixtures__/file1.json';
  const file2 = './__fixtures__/file2.json';

  expect(genDiff(file1, file2)).toEqual(res);
});
