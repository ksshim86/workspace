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

ipcMain.on('isWorkspace', (event) => {
  mapper.get('select root_path as rootPath from system_info', (err, row) => {
    let isWorkspace = false

    if (err) {
      console.error(`isWorkspace err : ${err}`)
    } else {
      console.log(row)

      if (row !== undefined) {
        isWorkspace = true
        console.log(`isWorkspace rootPath : ${row.rootPath}`)
      }
    }

    event.reply('isWorkspace-reply', isWorkspace)
  })
})

ipcMain.on('createWork', (event, args) => {
  const work = JSON.parse(JSON.stringify(args))

  mapper.get('select root_path as rootPath from system_info', (err, row) => {
    if (err) {
      console.error(`isWorkspace err : ${err}`)
    } else {
      console.log(row)

      if (row !== undefined) {
        work.path = path.resolve(row.rootPath, WORK_DIR, work.key)
        console.log(`work.path : ${work.path}`)

        const sql = `insert into work (name, key, path) values ('${work.name}', '${work.key}', '${work.path}');`

        mapper.insert(sql, (err2) => {
          const obj = {
            result: true,
            message: ''
          }

          if (err2) {
            console.error(`errs : ${err2.message}`)
            obj.result = false
            obj.message = err.message
          }

          fs.mkdir(work.path, { recursive: true }, (err3) => {
            console.log(err3)
          })

          event.reply('createWork-reply', obj)
        })
      }
    }
  })
})

ipcMain.on('getWork', (event) => {
  const sql = 'select id, name, name as label, key, path, del_yn as delYn from work'

  mapper.each(sql, (err, row) => {
    const obj = {
      result: true,
      message: '',
      row
    }

    if (err) {
      console.error(`err : ${err.message}`)
      obj.result = false
      obj.message = err.message
    }

    console.log(row)

    event.reply('getWork-reply', obj)
  })
})
