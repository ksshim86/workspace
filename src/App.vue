<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf" fit>
      <q-header elevated>
        <bar />
      </q-header>
      <q-page-container >
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import Bar from './components/Bar.vue'

export default {
  components: { Bar },
  name: 'App'
}
</script>
<style>
html {
  overflow-y: hidden;
}
</style>
