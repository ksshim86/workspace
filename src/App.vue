<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf" fit>
      <q-header elevated>
        <bar />
      </q-header>
      <q-page-container >
        <q-layout view="lhh lpR fFf" v-if="this.isWorkspace">
          <q-header bordered class="bg-primary text-white" height-hint="98">
            <q-toolbar>
              <q-btn dense flat round icon="menu" @click="left = !left" />

              <q-toolbar-title>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                </q-avatar>
                Title
              </q-toolbar-title>
            </q-toolbar>
            <q-tabs align="left">
              <q-route-tab to="/page1" label="Page One" />
              <q-route-tab to="/page2" label="Page Two" />
              <q-route-tab to="/page3" label="Page Three" />
            </q-tabs>
          </q-header>
          <q-drawer show-if-above v-model="left" side="left" bordered>
            <!-- drawer content -->
          </q-drawer>
          <q-page-container>
            <router-view />
          </q-page-container>
        </q-layout>
        <div v-else>
          <router-view />
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import Bar from './components/Bar.vue'

export default {
  components: { Bar },
  name: 'App',
  data() {
    return {
      left: false,
      isWorkspace: false
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
    ipcRenderer.send('isWorkspace', 'ping')
  },
  mounted() {
    ipcRenderer.on('isWorkspace-reply', (event, arg) => {
      this.isWorkspace = arg
    })
  },
}
</script>

<style>
html {
  overflow-y: hidden;
}
</style>
