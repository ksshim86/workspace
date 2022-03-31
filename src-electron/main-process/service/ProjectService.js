import path from 'path'
import fs from 'fs'
import projectRepository from '../mapper/ProjectRepository'
import systemService from './SystemService'

class ProjectService {
  constructor (args = {}) {
    this.repository = args.projectRepository
    this.systemService = args.systemService
  }

  async insertProject (params = []) {
    const { row } = await this.systemService.selectRootPath()

    const projectPath = path.resolve(row.rootPath, params[0])

    const mkdirErr = await new Promise((resolve) => {
      fs.mkdir(projectPath, { recursive: true }, (e) => {
        resolve(e)
      })
    })

    if (mkdirErr != null) {
      throw mkdirErr
    }

    params.push(projectPath)

    return this.repository.insertProject(params)
  }

  async selectProjects () {
    const res = this.repository.selectProjects()

    return res
  }
}

export default new ProjectService({ projectRepository, systemService })
