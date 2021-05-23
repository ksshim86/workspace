<template>
  <div id="welcome-page" class="fullscreen">
    <div class="text-white text-h3 fixed-center text-center">
      <div>Workspace</div>
      <div>
        <q-btn icon="folder" color="orange" :loading="loading"
        outline label="Select a directory as workspace" @click="handleChoiceBtnClicked" />
      </div>
    </div>
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
#welcome-page {
  margin-top: 32px;
  background-size: cover;
  background-image: url(~assets/vijw60l9bug61.jpg);
}
</style>
