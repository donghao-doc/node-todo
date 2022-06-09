const program = require('commander');

// 添加参数
program
  .option('-d, --debug', 'output extra debugging')

// 添加命令 add
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    console.log('words:', words)
  });

// 添加命令 clear
program
  .command('clear')
  .description('clear all task')
  .action(() => {
    console.log('清除成功')
  });

program.parse(process.argv);
