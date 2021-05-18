import {
  app, BrowserWindow, nativeTheme, ipcMain, dialog
} from 'electron'
import mapper from './sqlite-mapper'

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
    event.reply('choiceWorkspace-reply', result)
  }).catch((err) => {
    console.log(err)
  })
})
