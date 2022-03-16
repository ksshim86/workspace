import AppDao from './AppDao'

class WorkRepository {
  constructor (dao) {
    this.dao = dao
  }

  async selectWorks () {
    const sql = `
    SELECT
      id, name, key, path, del_yn as delYn
    FROM
      work
    WHERE
      del_yn = 'N'
    `

    return await this.dao.all(sql)
  }

  async insertWork (params = []) {
    const sql = `
    INSERT INTO work (name, key, path) VALUES (?, ?, ?)
    `

    return await this.dao.run(sql, params)
  }
}

export default new WorkRepository(new AppDao())
