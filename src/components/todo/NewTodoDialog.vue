<template>
  <q-dialog v-model="isOpen">
    <q-card class="my-card" style="max-width: 1200px;width:700px;">
      <q-card-section class="row items-center q-py-xs">
        <div class="text-overline">Create</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section >
        <q-input v-model="todo.title" dense label="Title" />
      </q-card-section>
      <q-card-section>
        Content
        <q-editor v-model="todo.content" min-height="10rem" />
      </q-card-section>
      <q-card-section align="right">
        <q-btn flat label="Close" v-close-popup />
        <q-btn flat label="Create" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'NewTodoDialog',
  data () {
    return {
      isOpen: true,
      todo: {
        no: 0,
        workId: 0,
        title: '',
        content: '',
        startDt: '',
        dueDt: '',
        fileId: ''
      }
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style>
</style>
