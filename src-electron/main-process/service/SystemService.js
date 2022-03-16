import systemRepository from '../mapper/SystemRepository'

class SystemService {
  constructor (repository) {
    this.repository = repository
  }

  selectRootPath () {
    return this.repository.selectRootPath()
  }

  async isWorkspace (callback) {
    this.handle('isWorkspace', callback)
  }

  insertSystemInfo (params = []) {
    return this.repository.insertSystemInfo(params)
  }
}

export default new SystemService(systemRepository)
