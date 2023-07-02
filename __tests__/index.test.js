import { fileURLToPath } from 'url';
import { describe, expect, test } from '@jest/globals';
import fs, {} from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yml'];

describe('gendiff', () => {
  test.each(formats)('exp', (format) => {
    const file1 = getFixturePath(`file1.${format}`);
    const file2 = getFixturePath(`file2.${format}`);

    expect(genDiff(file1, file2)).toEqual(readFile('resultrec.txt'));
    expect(genDiff(file1, file2, 'json')).toEqual(readFile('resultjson.txt'));
    expect(genDiff(file1, file2, 'plain')).toEqual(readFile('resultplain.txt'));
    expect(genDiff(file1, file2, 'stylish')).toEqual(readFile('resultrec.txt'));
  });
});
