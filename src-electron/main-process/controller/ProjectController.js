import appIpc from './AppIpc'
import projectService from '../service/ProjectService'

appIpc.handle('insertProject', async (event, args) => {
  const obj = {
    result: true,
    message: '',
  }

  try {
    const project = JSON.parse(JSON.stringify(args))
    const params = [project.name, project.avatar, project.avatarName]

    const res = await projectService.insertProject(params)

    obj.result = res.result
  } catch (error) {
    obj.result = false
    obj.message = error.message
  }

  return obj
})

appIpc.handle('selectProjects', async () => {
  const obj = {
    result: true,
    message: '',
    rows: {},
  }

  try {
    const res = await projectService.selectProjects()

    obj.rows = res.rows
  } catch (error) {
    obj.result = false
    obj.message = error.message
  }

  return obj
})
