<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf" fit>
      <q-header elevated>
        <q-bar class="q-electron-drag bg-black text-white">
          <div>Workspace <q-badge outline align="middle" color="orange">beta v0.0.1</q-badge></div>
          <q-space />
          <q-btn dense flat icon="minimize" />
          <q-btn dense flat icon="crop_square" />
          <q-btn dense flat icon="close" />
        </q-bar>
      </q-header>
      <q-page-container >
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
