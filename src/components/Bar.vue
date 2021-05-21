<template>
  <q-bar id="bar" class="q-electron-drag text-white">
    <div>Workspace <q-badge outline align="middle" color="orange">beta</q-badge></div>
    <q-space />
    <q-btn dense flat icon="minimize" @click="minimize" />
    <q-btn dense flat icon="crop_square" @click="maximize" />
    <q-btn dense flat icon="close" @click="close" />
  </q-bar>
</template>
<script>
export default {
  name: 'Bar',
  methods: {
    minimize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },
    maximize() {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },
    close() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  #bar {
    background-color: $dark;
  }
</style>
