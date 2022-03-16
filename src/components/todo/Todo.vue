<template>
  <q-card dark class="todo-card q-ma-md" flat style="min-width: 400px;">
    <q-card-section class="row items-center q-py-sm">
      <div class="text-overline">
        #{{ todo.key }}-{{ todo.no }}
      </div>
      <q-chip v-if="todo.status === 'TODO'" dense color="primary" text-color="white">
        Todo
      </q-chip>
      <q-chip v-else-if="todo.status === 'PROGRESS'" dense color="orange" text-color="white">
        Progress
      </q-chip>
      <q-chip v-else-if="todo.status === 'DONE'" icon="o_done" dense color="red" text-color="white">
        Done
      </q-chip>
      <q-space />
      <q-btn icon="open_in_new" flat round dense />
      <q-btn icon="more_horiz" flat round dense />
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-sm" :style="`height: 150px;`">
      <div class="text-h5 q-my-xs">{{ form.title }}</div>
      <div class="text-caption text-grey">
        {{ form.content }}
      </div>
    </q-card-section>

    <q-separator />
    <q-card-actions class="q-py-xs">
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
    </q-card-actions>
    <q-card-actions align="right" class="q-py-sm">
      <q-btn flat>
        {{ form.startDt }} - {{ form.dueDt }}
      </q-btn>
      <q-space />
      <q-btn flat round icon="folder_open" @click="handleOpenDirectoryBtnClicked()" />
      <q-btn flat round icon="o_attachment" :style="{ transform: 'rotate(135deg)'}" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Todo',
  props: {
    todo: {}
  },
  data () {
    return {
      form: {
        title: ''
      },
      isInputTitleFocus: false,
      isInputContentFocus: false,
    }
  },
  mounted () {
    this.form = JSON.parse(JSON.stringify(this.todo))
  },
  methods: {
    async handleOpenDirectoryBtnClicked () {
      const res = await ipcRenderer.invoke('openDirectoryByTodo')

      console.log(res)
    }
  }
}
</script>

<style lang="scss">
  .todo-card:hover {
    box-shadow: 0 0 0 1px orange inset !important;
  }
</style>
