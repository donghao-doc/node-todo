const program = require('commander');
const api = require('./index.js');

// 添加参数
program
  .option('-d, --debug', 'output extra debugging')

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
