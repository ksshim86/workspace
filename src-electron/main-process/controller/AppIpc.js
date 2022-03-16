import { ipcMain } from 'electron'

class AppIpc {
  constructor () {
    this.ipcMain = ipcMain
  }

  handle (channel, callback) {
    this.ipcMain.handle(channel, callback)
  }

  on (channel, callback) {
    this.ipcMain.on(channel, callback)
  }
}

export default new AppIpc()
