<template>
  <div
    class="fullscreen justify-center full-height full-width text-center"
    style="padding-top: 32px;"
  >
    <q-parallax src="~assets/vijw60l9bug61.jpg" style="min-height: -webkit-fill-available;">
      <h3 class="text-white">Workspace</h3>
      <q-btn icon="folder" color="orange" :loading="loading"
        outline label="Select a directory as workspace" @click="handleChoiceBtnClicked()" />
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
  methods: {
    handleChoiceBtnClicked() {
      this.loading = true

      ipcRenderer.send('choiceWorkspace', 'ping')
      ipcRenderer.on('choiceWorkspace-reply', (event, arg) => {
        this.loading = false
        console.log(arg)

        // if (!arg.canceled) {

        // }
      })
    }
  }
}
</script>

<style>

</style>
