import path from 'path'
import fs from 'fs'
import appIpc from './AppIpc'
import workService from '../service/WorkService'
import systemService from '../service/SystemService'

const WORK_DIR = 'work'

appIpc.handle('selectWorks', async () => {
  const obj = {
    result: true,
    message: '',
    rows: {}
  }

  const res = await workService.selectWorks()

  if (res.result) {
    obj.rows = res.rows
  } else {
    console.error(`err : ${res.err.message}`)
    obj.result = false
    obj.message = res.err.message
  }

  return obj
})

appIpc.handle('insertWork', async (event, args) => {
  async function selectRootPath () {
    const { row } = await systemService.selectRootPath()
    return row.rootPath
  }
  const obj = {
    result: true,
    message: ''
  }

  const rootPath = await selectRootPath()

  const work = JSON.parse(JSON.stringify(args))
  work.path = path.resolve(rootPath, WORK_DIR, work.key)

  const params = [work.name, work.key, work.path]
  const res = await workService.insertWork(params)

  if (res.result) {
    const mkdirErr = await new Promise((resolve) => {
      fs.mkdir(work.path, { recursive: true }, (e) => {
        resolve(e)
      })
    })

    if (mkdirErr !== null) {
      obj.result = false
      obj.message = mkdirErr
    }
  } else {
    obj.result = false
  }

  return obj
})
