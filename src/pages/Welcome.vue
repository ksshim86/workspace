<template>
  <div
    class="fullscreen justify-center full-height full-width text-center"
    style="margin-top: 32px;"
  >
    <q-parallax src="~assets/vijw60l9bug61.jpg" style="min-height: -webkit-fill-available;">
      <h3 class="text-white">Workspace</h3>
      <q-btn icon="folder" color="orange" :loading="loading"
        outline label="Select a directory as workspace" @click="handleChoiceBtnClicked()" />
      <!-- <q-btn icon="folder" color="orange"
        outline label="get" @click="testClicked()" /> -->
    </q-parallax>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Welcome',
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    ipcRenderer.on('test-reply', (event, arg) => {
      console.log(arg)
      // ipcRenderer.removeAllListeners('test-reply')
    })
  },
  methods: {
    handleChoiceBtnClicked() {
      this.loading = true

      const result = ipcRenderer.sendSync('choiceWorkspace', 'ping')
      console.log(result)
      this.loading = false
    },
    testClicked() {
      ipcRenderer.send('test', 'ping')
    }
  }
}
</script>

<style>

</style>
