#!/usr/bin/env node
import { Command } from "commander";
import { program } from "commander";
import genDiff from '../src/index.js'

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1,filepath2) => {
    const diff = genDiff(filepath1, filepath2);
  console.log(diff)
  });
  program.parse()
