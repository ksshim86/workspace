<template>
  <div id="q-app">
    <q-layout view="hhh Lpr lff" fit>
      <q-header>
        <!-- title bar size 조정 고민 필요 -->
        <!-- <bar style="top: 2px; position: relative;" /> -->
        <bar />
      </q-header>
      <sidebar v-if="isWorkspace" />
      <q-page-container>
          <router-view :contentHeight="Math.floor(contentHeight)" />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Dark } from 'quasar'
import Bar from './components/Bar'
import Sidebar from './components/Sidebar.vue'

Dark.set(false)

export default {
  components: { Bar, Sidebar },
  name: 'App',
  data () {
    return {
      left: false,
      mini: true,
      contentHeight: 0,
    }
  },
  async created () {
    await this.fetchIsWorkspace()
  },
  watch: {
    isWorkspace (newVal) {
      if (newVal) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/welcome')
      }
    }
  },
  computed: {
    ...mapGetters({
      isWorkspace: 'todo/GET_IS_WORKSPACE'
    })
  },
  methods: {
    ...mapActions({
      fetchIsWorkspace: 'todo/FETCH_IS_WORKSPACE'
    })
  }
}
</script>

<style>
html {
  overflow: hidden;
}
</style>
