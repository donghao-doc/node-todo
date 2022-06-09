const userHomeDir = require('os').homedir();
const home = process.env.home || userHomeDir;
const path = require('path')
const dbPath = path.join(home, '.todo')
const fs = require('fs')

module.exports.add = (title) => {
  // 读取文件内容，如果文件不存在，就创建 .todo 文件
  fs.readFile(dbPath, { flag: 'a+' }, (err, data) => {
    if (err) throw err
    let list
    try {
      list = JSON.parse(data.toString())
    } catch (err) {
      list = []
    }
    // 往 list 中添加一个任务
    list.push({ title, done: false })
    const content = JSON.stringify(list) + '\n'
    // 把任务写到 .todo 文件中
    fs.writeFile(dbPath, content, err => {
      if (err) throw err
      console.log('创建成功')
    })
  })
}