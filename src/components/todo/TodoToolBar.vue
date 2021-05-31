<template>
  <div>
    <q-toolbar class="shadow-1 text-white" style="min-height: 50px; background-color: #24292E;">
      <q-toolbar-title shrink>
        <q-btn flat icon="tag"
          :label="selectedWork ? selectedWork.name : 'ALL'"
          style="width: 150px;"
        >
          <q-menu fit anchor="bottom left" self="top left">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="selectedWork = null">
                <q-item-section>ALL</q-item-section>
              </q-item>
              <q-separator />
              <q-item
                v-for="work in works"
                :key="work.id"
                clickable v-close-popup
                @click="selectedWork = work"
              >
                <q-item-section>{{work.name}}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar-title>
      <div :style="`max-width: 400px;`">
        <q-tabs
          v-model="tab"
          dense
        >
          <q-tab name="mails" label="최신" />
          <q-tab name="alarms" label="상태" />
        </q-tabs>
      </div>
      <q-space />
      <q-btn icon="more_vert" flat round dense>
        <q-menu dark fit anchor="bottom left" self="top left">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                @click="handleNewWorkBtnClicked"
              >
                <q-item-section>New work</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      </q-btn>
    </q-toolbar>
    <new-work-dialog ref="newWorkDialog" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NewWorkDialog from './NewWorkDialog.vue'

export default {
  components: { NewWorkDialog },
  name: 'TodoToolBar',
  props: {
    works: {
      type: Array,
      default: Object
    }
  },
  data () {
    return {
      selectedWork: null,
      tab: 'mails'
    }
  },
  created () {
    // work 조회
  },
  watch: {
    selectedWork (work) {
      this.setSelectedWork(work)
    }
  },
  methods: {
    handleNewWorkBtnClicked () {
      this.$refs.newWorkDialog.isOpen = true
    },
    ...mapActions({
      setSelectedWork: 'todo/SET_SELECTED_WORK'
    })
  }
}
</script>

<style lang="scss">
</style>
