<template>
  <div>
    <todo-tool-bar />
    <div class="todo-page row items-start" v-if="isWork">
      <q-scroll-area ref="scroll" class="fit col"
        :style="`height: ${this.$attrs.contentHeight}px !important`">
        <todo-list />
      </q-scroll-area>
    </div>
    <div class="todo-page row items-start" v-else>
      <q-card flat class="my-card fixed-center text-white"
        style="max-width: 400px; background-color: #36393F;">
        <q-card-section>
          <div class="text-h6">Work를 만들고 할 일을 관리하세요</div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn outline @click="isNewWork = true">Create new work</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-dialog v-model="isNewWork">
      <q-card class="my-card" :style="`width: 400px;`">
        <q-card-section class="row items-center q-py-xs">
          <div class="text-overline">Create new work</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section >
          <q-input v-model="newWork.name" label="name" />
          <q-input v-model="newWork.key" label="key" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Create work"
           @click="handleNewWorkClicked" :disable="isDisableCreateWorkBtn" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import TodoToolBar from 'src/components/TodoToolBar.vue'
import { ipcRenderer } from 'electron'
import TodoList from 'src/components/TodoList.vue'

export default {
  components: { TodoToolBar, TodoList },
  name: 'TodoPage',
  data() {
    return {
      isWork: true,
      isNewWork: false,
      works: [],
      newWork: {
        name: '',
        key: ''
      }
    }
  },
  mounted() {
    const { scroll } = this.$refs

    if (scroll) {
      scroll.$el.firstElementChild.firstElementChild.className = 'absolute full-width row'
    }

    ipcRenderer.on('createWork-reply', (event, arg) => {
      console.log(arg)
      if (arg.result) {
        console.log('suceess')
        this.isNewWork = false
        this.newWork = {
          name: '',
          key: ''
        }
        this.notifyCreatedWork()
      }
    })
  },
  computed: {
    isDisableCreateWorkBtn() {
      return !(this.newWork.name && this.newWork.key)
    }
  },
  methods: {
    handleNewWorkClicked() {
      ipcRenderer.send('createWork', this.newWork)
    },
    notifyCreatedWork() {
      this.$q.notify({
        type: 'positive',
        color: 'light-blue-6',
        message: 'Created new work',
        position: 'bottom-right'
      })
    }
  }
}
</script>

<style lang="scss">
  .todo-page {
    background-color: #36393F;
    height: -webkit-fill-available;
  }
</style>
