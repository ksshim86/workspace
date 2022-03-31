import AppDao from './AppDao'

class SystemRepository {
  constructor (dao) {
    this.dao = dao
  }

  insertProject (params = []) {
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

    return this.dao.run(sql, params)
  }

  async selectProjects () {
    const sql = `
    SELECT
      id, name, path, avatar, avatar_name, del_yn
    FROM
      project
    WHERE
      del_yn = 'N'
    `

    const res = await this.dao.all(sql)

    return res
  }
}

export default new SystemRepository(new AppDao())
