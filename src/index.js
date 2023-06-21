import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getDataFile = (filepath) => {
  const pathFull = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathFull,'utf-8');
};

const genDiff = (filepath1, filepath2) => {
  const filePathOne = getDataFile(filepath1);
  const filePathTwo = getDataFile(filepath2);
  const formatOne = getFormat(filepath1);
  const formatTwo = getFormat(filepath2);
  const objOne = parse(filePathOne, formatOne);
  const objTwo = parse(filePathTwo, formatTwo);
  const takeKeysOne = Object.keys(objOne);
  const takeKeysTwo = Object.keys(objTwo);
  const union = _.union(takeKeysOne, takeKeysTwo);
  const sort = _.sortBy(union);

  const result = sort.reduce((acc, key) => {
    if (!_.has(objOne, key)) {
      acc.push(`+ ${key}: ${objTwo[key]}\n`);
    } else if (!_.has(objTwo, key)) {
      acc.push(`- ${key}: ${objOne[key]}\n`);
    } else if (objOne[key] === objTwo[key]) {
      acc.push(`  ${key}: ${objTwo[key]}\n`);
    } else if (objOne[key] !== objTwo[key]) {
      acc.push(`+ ${key}: ${objTwo[key]}\n`);
      acc.push(`- ${key}: ${objOne[key]}\n`);
    }
    return acc;
  }, []);
  return `{\n${result.join('')}\n}`;
};

export default genDiff;
