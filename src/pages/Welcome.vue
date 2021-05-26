<template>
  <div id="welcome-page" class="fullscreen">
    <div class="text-white text-h3 fixed-center text-center">
      <div>Workspace</div>
      <div>
        <q-btn icon="folder" color="orange"
        outline label="Select a directory as workspace" @click="handleSelectWorkspaceBtnClicked" />
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Welcome',
  methods: {
    handleSelectWorkspaceBtnClicked() {
      const arg = ipcRenderer.sendSync('selectWorkspace', 'ping')

      if (arg.result && !arg.canceled) {
        this.$router.push('/')
      }
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
