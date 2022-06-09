#!/usr/bin/env node

const program = require('commander');
const api = require('./index.js');
const pkg = require('./package.json');

// 添加参数
program
  .version(pkg.version)

// 添加命令 add
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words)
  });

// 添加命令 clear
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    api.clear()
  });

program.parse(process.argv);

// 当用于只输入 node cli.js 时，展示 todo 列表
if (process.argv.length === 2) {
  api.showAll()
}
