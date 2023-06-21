import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
      break;
    case 'yml':
    case 'yaml':
      return yaml.load(data);
      break;
    default:
      console.log(format);
  }
};
export default parse;
