<template>
  <div id="q-app">
    <q-layout view="hhh Lpr lff" fit>
      <q-header>
        <!-- title bar size 조정 고민 필요 -->
        <!-- <bar style="top: 2px; position: relative;" /> -->
        <bar />
      </q-header>
      <q-drawer v-if="isWorkspace" show-if-above v-model="left" side="left"
        bordered :width="200" :breakpoint="400" :mini="mini" dark>
        <!-- drawer content -->
        <q-scroll-area class="fit" :style="`overflow: hidden;`">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox"></q-icon>
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star"></q-icon>
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send"></q-icon>
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send"></q-icon>
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
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

const { offset } = dom

export default {
  components: { Bar },
  name: 'App',
  data () {
    return {
      left: false,
      mini: true,
      contentHeight: 0,
    }
  },
  async mounted () {
    this.fetchIsWorkspace()
  },
  watch: {
    isWorkspace (newVal) {
      if (newVal) {
        this.$router.push('/todo')
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
      console.log(`${containerTop}, ${height}`)
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
