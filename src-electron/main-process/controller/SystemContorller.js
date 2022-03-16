import { dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import appIpc from './AppIpc'
import systemService from '../service/SystemService'

/**
 * workspace 폴더가 지정되어있는지 확인
 */
appIpc.handle('isWorkspace', async () => {
  const obj = {
    result: true,
    message: '',
    row: {},
    isWorkspace: false
  }

  const res = await systemService.selectRootPath()

  if (res.result) {
    if (res.row !== undefined) {
      obj.isWorkspace = true
      obj.row = res.row
    }
  } else {
    obj.result = false
  }

  return obj
})

appIpc.on('insertSystemInfo', (event) => {
  const obj = {
    result: true,
    message: '',
    canceled: false
  }

  dialog.showOpenDialog({
    properties: ['promptToCreate', 'openDirectory']
  }).then(async (result) => {
    obj.canceled = result.canceled

    if (!result.canceled) {
      const res = await systemService.insertSystemInfo([
        result.filePaths,
        `${result.filePaths}\\work`,
        `${result.filePaths}\\todo`
      ])

      if (res.result) {
        const workDirPath = path.resolve(result.filePaths[0], 'work')

        fs.mkdir(workDirPath, { recursive: false }, () => {
          event.returnValue = obj
        })
      }
    }
  }).catch((err) => {
    obj.result = false
    obj.message = err

    event.returnValue = obj
  })
})
