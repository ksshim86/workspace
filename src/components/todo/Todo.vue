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
      <div class="q-my-xs">
        <q-input
          dense borderless :outlined="isInputTitleFocus"
          input-class="text-white text-h5"
          v-model="form.title"
          @focus="isInputTitleFocus = !isInputTitleFocus"
          @blur="isInputTitleFocus = !isInputTitleFocus"
        />
      </div>
      <div>
        <q-input
          dense borderless :outlined="isInputContentFocus"
          type="textarea"
          rows=3
          input-class="text-white text-caption text-grey"
          input-style="resize: none; height: 85px;"
          v-model="form.content"
          @focus="isInputContentFocus = !isInputContentFocus"
          @blur="isInputContentFocus = !isInputContentFocus"
        />
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
        21.05.24 - 21.05.30
      </q-btn>
      <q-space />
      <q-btn flat round icon="o_attachment" :style="{ transform: 'rotate(135deg)'}" />
    </q-card-actions>
  </q-card>
</template>

<script>
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
    this.form = this.todo
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .todo-card:hover {
    box-shadow: 0 0 0 1px orange inset !important;
  }
</style>
