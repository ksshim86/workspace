import AppDao from './AppDao'

class TodoRepository {
  constructor (dao) {
    this.dao = dao
  }

  async selectTodos (id) {
    let sql = `
    SELECT
      no, work_id as workId,
      (SELECT key FROM work WHERE id = work_id) key,
      title, content, status,
      start_dt as startDt, due_dt as dueDt, del_yn as delYn
    FROM
      todo
    WHERE
      del_yn = 'N'
    `

    if (typeof id === 'number') {
      sql += `
      AND
        work_id = ?
      `
    }

    const res = await this.dao.all(sql, [id])

    return res
  }
}

export default new TodoRepository(new AppDao())
