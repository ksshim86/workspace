import sqlite from 'sqlite3'
import path from 'path'

const dbPath = path.resolve(__dirname, 'workspace.db')

const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE || sqlite.OPEN_CREATE, (err) => {
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

const insert = (sql) => {
  db.run(sql, (err) => {
    if (err) {
      console.error(`err : ${err.message}`)
    }
  })
}

const close = () => {
  db.close((err) => {
    if (err) {
      console.error(`err : ${err.message}`)
    }

    console.log('Close the database connection.')
  })
}

export default { insert, close }
