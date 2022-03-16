import AppDao from './AppDao'

class TagRepository {
  constructor (dao) {
    this.dao = dao
  }

  async selectTagsByTodoId (params = []) {
    const sql = `
    SELECT
      id, name
    FROM
      tag
    WHERE id IN (
      SELECT
        tag_id
      FROM
        tag_todo_map
      WHERE
        work_id = ?
      AND
        todo_no = ?
    )
    `

    const res = await this.dao.all(sql, params)

    return res
  }
}

export default new TagRepository(new AppDao())
