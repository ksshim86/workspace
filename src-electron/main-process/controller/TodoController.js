import {
  shell
} from 'electron'
import appIpc from './AppIpc'
import todoService from '../service/TodoService'

appIpc.handle('selectTodos', async (event, workId) => {
  const res = await todoService.selectTodos(workId)

  return res
})

appIpc.handle('openDirectoryByTodo', async () => {
  const res = shell.showItemInFolder('D:\\study\\work\\')

  return res
})
