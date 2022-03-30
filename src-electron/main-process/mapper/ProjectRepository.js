import AppDao from './AppDao'

class SystemRepository {
  constructor (dao) {
    this.dao = dao
  }

  async insertProject (params = []) {
    const sql = `
      INSERT INTO project
      (
        name,
        avatar,
        avatar_name,
        path
      )
      VALUES
      (
        ?,
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
