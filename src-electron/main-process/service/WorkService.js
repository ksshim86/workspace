import workRepository from '../mapper/WorkRepository'

class WorkService {
  constructor (repository) {
    this.repository = repository
  }

  selectWorks () {
    return this.repository.selectWorks()
  }

  insertWork (params = []) {
    return this.repository.insertWork(params)
  }
}

export default new WorkService(workRepository)
