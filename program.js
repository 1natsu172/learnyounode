// #2
// const a = process.argv.slice(2).reduce((p,c,i,a)=> Number(p) + Number(c))
// console.log(a);

// #3
// const fs = require('fs')

// const file = fs.readFileSync(process.argv[2])
// const line = file.toString().split('\n').length - 1
// console.log(line);

// #4
// const fs = require('fs')

// const file = fs.readFile(process.argv[2], (err, data)=> {
//   if (err) {
//     return console.error(err);
//   }
//   const line = data.toString().split('\n').length - 1
//   console.log(line);
// })

// #5
// const fs = require('fs')
// const path = require('path')

// const dirPath = process.argv[2]
// const fileExt = `.${process.argv[3]}`

// fs.readdir(dirPath, (err, files) => {
//   if (err) {
//     return console.error(err)
//   }
//   const list = files.filter(file => {
//     if( path.extname(file) === fileExt ) {
//       console.log(file)
//       return file
//     }
//   })
// })

// #6
// const readFolderContent = require('./readFolderContent')

// const dirPath = process.argv[2]
// const fileExt = `${process.argv[3]}`

// readFolderContent(dirPath, fileExt, (err, list) => {
//   if (err) {
//     return console.error(err)
//   }
//   list.forEach(file => {
//     console.log(file)
//   })
// })

// #7
// const http = require('http')

// const url = process.argv[2]

// http
//   .get(url, res => {
//     res.setEncoding('utf8')
//     res.on('data', console.log)
//     res.on('error', console.error)
//   })
//   .on('error', console.error)

// #8
// const http = require('http')
// const bl = require('bl')

// const url = process.argv[2]

// http.get(url, res => {
//   res.pipe(
//     bl((err, data)=> {
//       if (err) console.error(err)
//       data = data.toString()
//       console.log(data.length)
//       console.log(data)
//     })
//   )
// })

// #9
// const http = require('http')
// const bl = require('bl')

// const urls = process.argv.slice(2)

// const getContent = urls => {
//   const fetches = urls.map(url => {
//     return new Promise((resolve, reject) => {
//       http.get(url, res => {
//         res.pipe(
//           bl((err, data) => {
//             if (err) reject(err)
//             data = data.toString()

//             // console.log(data);
//             resolve(data)
//           })
//         )
//       })
//     })
//   })

//   // Promise.all(getData).then(texts => texts.forEach(text => console.log(data)))
//   return Promise.all(fetches)
// }

// getContent(urls).then(contents => contents.forEach(content=>console.log(content)))

// #10
// const net = require('net')
// const moment = require('moment')

// const port = Number(process.argv[2])
// const currentTime = () => moment().format("YYYY-MM-DD kk:mm");

// const handleSocket = socket => {
//   socket.end(`${currentTime()}\n`)
// }

// const server = net.createServer(socket => handleSocket(socket))
// server.listen(port)

// #11
// const http = require('http')
// const fs = require('fs')

// const port = Number(process.argv[2])
// const filePath = process.argv[3]

// const server = http.createServer((req,res) => {
//   res.writeHead(200, { 'content-type': 'text/plain' })
//   fs.createReadStream(filePath).pipe(res)
// })
// server.listen(port)

// #12
// const http = require('http')
// const map = require('through2-map')

// const port = Number(process.argv[2])

// const server = http.createServer((req, res) => {
//   if (req.method !== 'POST') {
//     return res.end(`please send a POST\n`)
//   }

//   req
//     .pipe(
//       map(chunk => {
//         return chunk.toString().toUpperCase()
//       })
//     )
//     .pipe(res)
// })

// server.listen(port)

// #13
const http = require('http')
const url = require('url')
const moment = require('moment')

const port = Number(process.argv[2])

console.log(url.parse)

const parseTime = time => {
  time = new Date(time)
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

const parseUnixTime = time => {
  time = new Date(time)
  return { unixtime: time.getTime() }
}

const server = http.createServer((req, res) => {
  const parseQuery = url.parse(req.url, true)
  const isoTime = parseQuery.query.iso

  let result

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parseTime(isoTime)
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = parseUnixTime(isoTime)
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})

server.listen(port)
