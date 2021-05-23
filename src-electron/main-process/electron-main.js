import {
  app, BrowserWindow, nativeTheme, ipcMain, dialog
} from 'electron'
import path from 'path'
import mapper from './sqlite-mapper'

const filePath = path.join(app.getPath('userData'), '/some.files')

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }

  nativeTheme.themeSource = 'dark'
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
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
    minHeight: 350,
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

ipcMain.on('choiceWorkspace', (event, ...args) => {
  dialog.showOpenDialog({
    properties: ['promptToCreate', 'openDirectory']
  }).then((result) => {
    if (!result.canceled) {
      mapper.insert(`insert into system_info (root_path) values ('${result.filePaths}')`)
    }

    console.log(result.canceled)
    console.log(result.filePaths)
    event.returnValue = result
  }).catch((err) => {
    console.log(err)
    event.returnValue = err
  })
})

ipcMain.on('isWorkspace', (event, ...args) => {
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
  work.path = '/'

  const sql = `insert into work (name, key, path) values ('${work.name}', '${work.key}', '/');`

  mapper.insert(sql, (err) => {
    const obj = {
      result: true,
      message: ''
    }

    if (err) {
      console.error(`err : ${err.message}`)
      obj.result = false
      obj.message = err.message
    }

    event.reply('createWork-reply', obj)
  })
})
