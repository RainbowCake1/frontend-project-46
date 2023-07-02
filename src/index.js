import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import buildTree from './buildtree.js';
import formatData from './formater/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getDataFile = (filepath) => {
  const pathFull = path.resolve(process.cwd(), filepath);
  return parse(fs.readFileSync(pathFull, 'utf-8'), getFormat(filepath));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);
  const tree = buildTree(data1, data2);

  return formatData(tree, formatName);
};

export default genDiff;
