const fs = require('fs')
const path = require('path')

module.exports = (dirPath, filter, callback) => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return callback(err)
    }

    const list = files.filter(file => path.extname(file) === '.'+filter)
    
    callback(null, list)
  })
}
