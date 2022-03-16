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

const query = {
  createTable: {
    systemInfo: `
      CREATE TABLE IF NOT EXISTS "system_info" (
        ROOT_PATH TEXT NULL,
        WORK_PATH TEXT NULL,
        TODO_PATH TEXT NULL
      )
    `,
    work: `
      CREATE TABLE IF NOT EXISTS "work" (
        "id" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "key" TEXT NOT NULL,
        "path" TEXT NOT NULL,
        "del_yn" TEXT NOT NULL DEFAULT 'N',
        PRIMARY KEY("id" AUTOINCREMENT)
      )
    `,
    todo: `
      CREATE TABLE IF NOT EXISTS "todo" (
        "no" INTEGER NOT NULL UNIQUE,
        "work_id" INTEGER NOT NULL,
        "title" TEXT NOT NULL,
        "content" TEXT,
        "status" TEXT NOT NULL,
        "start_dt" TEXT,
        "due_dt" TEXT,
        "file_id" TEXT,
        "del_yn" TEXT NOT NULL DEFAULT 'N',
        PRIMARY KEY("no"),
        FOREIGN KEY("work_id") REFERENCES "work"("id")
      )
    `
  }
}

db.run(query.createTable.systemInfo, (err) => {
  if (err) {
    console.error(`err : ${err.message}`)
  } else {
    console.log('create table system_info')
  }
})
db.run(query.createTable.work, (err) => {
  if (err) {
    console.error(`err : ${err.message}`)
  } else {
    console.log('create table work')
  }
})
db.run(query.createTable.todo, (err) => {
  if (err) {
    console.error(`err : ${err.message}`)
  } else {
    console.log('create table todo')
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
  console.log(sql)
  console.log(params)
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
