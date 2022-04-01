import AppDao from './AppDao'

class SystemRepository {
  constructor (dao) {
    this.dao = dao
  }

  async createTableSystemInfo () {
    const sql = `
    CREATE TABLE IF NOT EXISTS system_info (
      ROOT_PATH TEXT NULL,
      WORK_PATH TEXT NULL,
      TODO_PATH TEXT NULL
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async createTableProject () {
    const sql = `
    CREATE TABLE IF NOT EXISTS project (
      id INTEGER NOT NULL UNIQUE,
      name TEXT NOT NULL,
      path TEXT NOT NULL,
      initial TEXT NOT NULL,
      avatar BLOB NULL,
      avatar_name TEXT NULL,
      del_yn TEXT NOT NULL DEFAULT 'N',
      PRIMARY KEY(id AUTOINCREMENT)
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async createTableWork () {
    const sql = `
    CREATE TABLE IF NOT EXISTS work (
      id INTEGER NOT NULL UNIQUE,
      project_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      key TEXT NOT NULL,
      path TEXT NOT NULL,
      del_yn TEXT NOT NULL DEFAULT 'N',
      PRIMARY KEY(id AUTOINCREMENT),
      FOREIGN KEY(project_id) REFERENCES project(id)
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async createTableTodo () {
    const sql = `
    CREATE TABLE IF NOT EXISTS todo (
      id INTEGER NOT NULL UNIQUE,
      work_id INTEGER NOT NULL, 
      title TEXT NOT NULL,
      content TEXT,
      status TEXT NOT NULL,
      start_dt TEXT,
      due_dt TEXT,
      file_id TEXT,
      del_yn TEXT NOT NULL DEFAULT 'N',
      PRIMARY KEY(id AUTOINCREMENT),
      FOREIGN KEY(work_id) REFERENCES work(id)
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async createTableTag () {
    const sql = `
    CREATE TABLE IF NOT EXISTS tag (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async createTableTagTodoMap () {
    const sql = `
    CREATE TABLE IF NOT EXISTS tag_todo_map (
      work_id INTEGER REFERENCES work (id),
      todo_id INTEGER REFERENCES todo (id),
      tag_id  INTEGER REFERENCES tag (id) 
    )
    `

    const res = await this.dao.run(sql)

    return res
  }

  async selectRootPath () {
    const sql = `
      SELECT
        root_path as rootPath
      FROM
        system_info
    `
    const res = await this.dao.get(sql)

    return res
  }

  async insertSystemInfo (params = []) {
    const sql = `
      INSERT INTO system_info
      (
        root_path,
        work_path,
        todo_path
      )
      VALUES
      (
        ?,
        ?,
        ?
      )
    `

    const res = await this.dao.run(sql, params)

    return res
  }
}

export default new SystemRepository(new AppDao())
