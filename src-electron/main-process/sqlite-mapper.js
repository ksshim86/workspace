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

const run = async (sql, params) => {
  const res = await new Promise((resolve, reject) => {
    console.log(reject)
    db.run(sql, params, (err) => {
      resolve(err)
    })
  })

  return res
}

const get = async (sql, params) => {
  const res = await new Promise((resolve) => {
    db.get(sql, params, (err, row) => {
      resolve({ err, row })
    })
  })

  return res
}

const all = async (sql, params) => {
  const res = await new Promise((resolve, reject) => {
    console.log(reject)
    db.all(sql, params, (err, rows) => {
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
  run, get, close, all
}
