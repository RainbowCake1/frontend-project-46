import { fileURLToPath } from 'url';
import {expect, test} from '@jest/globals';
import genDiff from '../src';
import fs from 'fs'
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


test('json',()=>{
const file1 = readFile('file1.json');
const file2 = readFile('file2.json')

expect(genDiff(file1,file2)).toEqual(readFile('resultjson.txt'))
});
