const userHomeDir = require('os').homedir();
const home = process.env.home || userHomeDir;
const path = require('path')
const dbPath = path.join(home, '.todo')
const fs = require('fs')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) throw err
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (err) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const content = JSON.stringify(list) + '\n'
      fs.writeFile(path, content, err => {
        if (err) throw err
        resolve('success')
      })
    })
  }
}

module.exports = db