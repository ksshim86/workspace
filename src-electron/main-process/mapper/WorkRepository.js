import AppDao from './AppDao'

class WorkRepository {
  constructor (dao) {
    this.dao = dao
  }

  selectWorks () {
    const sql = `
    SELECT
      id, name, key, path, del_yn as delYn
    FROM
      work
    WHERE
      del_yn = 'N'
    `

    return this.dao.all(sql)
  }

  insertWork (params = []) {
    const sql = `
    INSERT INTO work (name, key, path) VALUES (?, ?, ?)
    `

    return this.dao.run(sql, params)
  }
}

export default new WorkRepository(new AppDao())
