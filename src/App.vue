<template>
  <div id="q-app">
    <q-layout view="hhh Lpr lff" fit>
      <q-header>
        <!-- title bar size 조정 고민 필요 -->
        <!-- <bar style="top: 2px; position: relative;" /> -->
        <bar />
      </q-header>
      <left-menu isWorkspace="isWorkspace" />
      <q-page-container class="fullscreen" ref="container"
        style="padding: 0px; margin-top: 32px; margin-left: 57px;">
          <q-resize-observer @resize="onResize"/>
          <router-view :contentHeight="Math.floor(contentHeight)" />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { dom } from 'quasar'
import Bar from './components/Bar'
import LeftMenu from './components/LeftMenu.vue'

const { offset } = dom

export default {
  components: { Bar, LeftMenu },
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
    onResize () {
      const containerTop = offset(this.$refs.container.$el).top
      const height = this.$refs.container.$el.clientHeight

      this.contentHeight = height - containerTop - 16
    },
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
