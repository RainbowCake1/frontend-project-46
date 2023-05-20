import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getDataFile = (filepath) => {
  const pathFull = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(pathFull)
}

const parse = (data) => JSON.parse(data);

const genDiff = (filepath1,filepath2) =>{
  const filePathOne = getDataFile(filepath1);
    const filePathTwo = getDataFile(filepath2);
    const parseInObjectOne = parse(filePathOne);
    const parseInObjectTwo = parse(filePathTwo);
    const takeKeysOne = Object.keys(parseInObjectOne);
    const takeKeysTwo = Object.keys(parseInObjectTwo);
    const union = _.union(takeKeysOne,takeKeysTwo);
    const sort = _.sortBy(union)
    
    
    const result = sort.reduce((acc,key) =>{
        if (!_.has(parseInObjectOne, key)) {
            acc.push(`+ ${key}: ${parseInObjectTwo[key]}\n`);
} else if (!_.has(parseInObjectTwo,key)) {
    acc.push(`- ${key}: ${parseInObjectOne[key]}\n`);
}else if (parseInObjectOne[key] === parseInObjectTwo[key]){
    acc.push(`  ${key}: ${parseInObjectTwo[key]}\n`)
} else if (parseInObjectOne[key] !== parseInObjectTwo[key]){
    acc.push(`+ ${key}: ${parseInObjectTwo[key]}\n`);
    acc.push(`- ${key}: ${parseInObjectOne[key]}\n`);
}
return acc;
    },[])
    return `{\n${result.join('')}\n}`
}

export default genDiff