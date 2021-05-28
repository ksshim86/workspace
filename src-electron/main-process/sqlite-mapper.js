import sqlite from 'sqlite3'
import path from 'path'

const dbPath = path.resolve(process.resourcesPath, 'workspace.db')

// eslint-disable-next-line no-bitwise
const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
  if (err) {
    console.error(`err : ${err.message}`)
  } else {
    console.log('Connected to the workspace database.')
  }
})

db.run('create table system_info(root_path text null)', (err) => {
  if (err) {
    console.error(`err : ${err.message}`)
  }
})

const insert = (sql, callback) => {
  db.run(sql, callback)
}

const get = (sql, callback) => {
  db.get(sql, callback)
}

const all = async (sql, param) => {
  const res = await new Promise((resolve, reject) => {
    console.log(reject)
    db.all(sql, param, (err, rows) => {
      resolve({ err, rows })
    })
  })

  return res
}

const close = () => {
  db.close((err) => {
    if (err) {
      console.error(`err : ${err.message}`)
    }

    console.log('Close the database connection.')
  })
}

export default {
  insert, get, close, all
}
