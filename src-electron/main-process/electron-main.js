import {
  app, BrowserWindow, nativeTheme, ipcMain, dialog
} from 'electron'
import path from 'path'
import fs from 'fs'
import mapper from './sqlite-mapper'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    // eslint-disable-next-line global-require
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }

  nativeTheme.themeSource = 'dark'
  // eslint-disable-next-line no-empty
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  // eslint-disable-next-line no-underscore-dangle
  global.__statics = __dirname
}

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 490,
    minHeight: 360,
    titleBarStyle: 'customButtonsOnHover',
    frame: false,
    // transparent: true,
    useContentSize: true,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      // preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const WORK_DIR = 'work'
let ROOT_PATH = ''

ipcMain.on('selectWorkspace', (event) => {
  const obj = {
    result: true,
    message: '',
    canceled: false
  }

  dialog.showOpenDialog({
    properties: ['promptToCreate', 'openDirectory']
  }).then((result) => {
    obj.canceled = result.canceled

    if (!result.canceled) {
      mapper.insert(`insert into system_info (root_path) values ('${result.filePaths}')`)
      const workDirPath = path.resolve(result.filePaths[0], `${WORK_DIR}`)

      fs.mkdir(workDirPath, { recursive: false }, (err) => {
        console.log(err)
        event.returnValue = obj
      })
    }
  }).catch((err) => {
    console.log(err)

    obj.result = false
    obj.message = err
    event.returnValue = obj
  })
})

ipcMain.handle('isWorkspace', async () => {
  const obj = {
    result: true,
    message: '',
    row: {},
    isWorkspace: false
  }
  const sql = `select 
                root_path as rootPath 
              from 
                system_info`

  const { err, row } = await mapper.get(sql)

  if (err) {
    console.error(`isWorkspace err : ${err}`)
    obj.result = false
    obj.message = err
  } else {
    console.log(row)

    if (row !== undefined) {
      obj.isWorkspace = true
      obj.row = row
      ROOT_PATH = row.rootPath
    }
  }

  return obj
})

ipcMain.handle('createWork', async (event, args) => {
  const obj = {
    result: true,
    message: ''
  }
  const work = JSON.parse(JSON.stringify(args))
  work.path = path.resolve(ROOT_PATH, WORK_DIR, work.key)

  const params = [work.name, work.key, work.path]
  const sql = 'insert into work (name, key, path) values (?, ?, ?)'

  const err = await mapper.insert(sql, params)

  if (err) {
    console.error(`err : ${err.message}`)
    obj.result = false
    obj.message = err.message
  } else {
    const mkdirErr = await new Promise((resolve) => {
      fs.mkdir(work.path, { recursive: true }, (e) => {
        console.log(e)
        resolve(e)
      })
    })

    if (mkdirErr !== null) {
      obj.result = false
      obj.message = mkdirErr
    }
  }

  return obj
})

ipcMain.handle('getWork', async () => {
  const obj = {
    result: true,
    message: '',
    rows: {}
  }

  const sql = 'select id, name, name as label, key, path, del_yn as delYn from work'

  const res = await mapper.all(sql, [])

  if (res.error) {
    console.error(`err : ${res.err.message}`)
    obj.result = false
    obj.message = res.err.message
  }

  obj.rows = res.rows

  console.log(22222222222222)

  return obj
})

ipcMain.handle('getTodoList', async (event, args) => {
  const obj = {
    result: true,
    message: '',
    rows: {}
  }
  console.log(`args : ${args}`)

  const sql = `select
                no, work_id as workId, title, content, status,
                start_dt as startDt, due_dt as dueDt, del_yn as delYn
              from
                todo
              where
                work_id = ?
              and
                del_yn = 'N'`

  const res = await mapper.all(sql, [args])

  if (res.error) {
    console.error(`err : ${res.err.message}`)
    obj.result = false
    obj.message = res.err.message
  }

  obj.rows = res.rows

  return obj
})
