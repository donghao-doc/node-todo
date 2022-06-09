const db = require('./db.js');
const inquirer = require('inquirer');

module.exports.add = async (title) => {
  // 读取文件内容，如果文件不存在，就创建 .todo 文件
  const list = await db.read()
  // 往 list 中添加一个任务
  list.push({ title, done: false })
  // 把任务写到 .todo 文件中
  const result = await db.write(list)
  console.log(result)
}

module.exports.clear = async () => {
  const result = await db.write([])
  console.log(result)
}

module.exports.showAll = async () => {
  const list = await db.read()
  // 展示 todo 列表
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择你想操作的任务',
    choices: [
      { name: '退出', value: '-1' },
      ...list.map((task, index) => {
        return { name: `${task.done ? '[√]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
      }),
      { name: '+ 创建任务', value: '-2' }
    ]
  }).then(answer => {
    const index = parseInt(answer.index)
    // 选择任务
    if (index >= 0) {
      // 选择操作
      inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
          { name: '退出', value: 'quit' },
          { name: '已完成', value: 'markAsDone' },
          { name: '未完成', value: 'markAsUndone' },
          { name: '改标题', value: 'updateTitle' },
          { name: '删除', value: 'remove' },
        ]
      }).then(answer => {
        // 执行操作
        switch (answer.action) {
          case 'markAsDone':
            list[index].done = true
            db.write(list)
            break
          case 'markAsUndone':
            list[index].done = false
            db.write(list)
            break
          case 'updateTitle':
            inquirer.prompt({
              type: 'input',
              name: 'title',
              message: '新的标题',
              default: list[index].title
            }).then(answer => {
              list[index].title = answer.title
              db.write(list)
            })
            break
          case 'remove':
            list.splice(index, 1)
            db.write(list)
            break
        }
      })
    }
    // 创建任务
    if (index === -2) {
      inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '请输入任务标题'
      }).then(answer => {
        list.push({ title: answer.title, done: false })
        db.write(list)
      })
    }
  });
}