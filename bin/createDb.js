const mysql = require('mysql')
const fs = require('fs')
const path = require('path')

fs.readFile(`${path.join(__dirname, '../server')}/datasources.json`, 'utf8', (err, data) => {
  if (err) throw err
  let obj = JSON.parse(data)
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let db = obj[keys[i]]
    if (db.host && db.port && db.database && db.password) {
      let con = mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password,
        port: db.port
      })
      con.connect((err) => {
        if (err) throw err
        con.query(`CREATE DATABASE IF NOT EXISTS ${db.database}`, (err, result) => {
          if (err) throw err
          console.log('Database created')
          con.end()
        })
      })
    }
  }
})
