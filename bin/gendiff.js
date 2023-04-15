#!/usr/bin/env node
import { Command } from 'commander/index.js';
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')

program.parse();
