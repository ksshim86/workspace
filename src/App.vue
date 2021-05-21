<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf" fit>
      <q-header elevated>
        <bar />
      </q-header>
      <q-page-container >
        <!-- <q-layout view="lhh lpR fFf" v-if="this.isWorkspace"> -->
        <q-layout view="lhh Lpr lff" v-if="this.isWorkspace">
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
          </q-header>
          <q-drawer show-if-above v-model="left" side="left"
            bordered :width="200" :breakpoint="400">
            <!-- drawer content -->
          </q-drawer>
          <q-page-container id="page-container">
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

      if (arg) {
        this.$router.push('/todo')
      } else {
        this.$router.push('/welcome')
      }
    })
  }
}
</script>

<style>
html {
  overflow-y: hidden;
}
</style>
