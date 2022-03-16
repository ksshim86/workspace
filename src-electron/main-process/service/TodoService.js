import TodoRepository from '../mapper/TodoRepository'
import TagRepository from '../mapper/TagRepository'

class TodoService {
  constructor (todoRepository, tagRepository) {
    this.todoRepository = todoRepository
    this.tagRepository = tagRepository
  }

  async selectTodos (workId) {
    const todoRes = await this.todoRepository.selectTodos(workId)
    const todos = todoRes.rows

    todos.forEach(async (todo) => {
      const params = [todo.workId, todo.no]
      const tagRes = await this.tagRepository.selectTagsByTodoId(params)

      if (tagRes.result) {
        if (tagRes.rows !== undefined && tagRes.rows.length > 0) {
          todo.tags = tagRes.rows
        }
      }
    })

    return todoRes
  }
}

export default new TodoService(TodoRepository, TagRepository)
