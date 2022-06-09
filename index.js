const db = require('./db.js')

module.exports.add = async (title) => {
  // 读取文件内容，如果文件不存在，就创建 .todo 文件
  const list = await db.read()
  // 往 list 中添加一个任务
  list.push({ title, done: false })
  // 把任务写到 .todo 文件中
  const result = await db.write(list)
  console.log(result)
}