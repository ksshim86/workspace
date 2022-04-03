<template>
  <q-page>
    <todo-tool-bar :works="works" />
  </q-page>
</template>

<script>
import TodoToolBar from 'src/components/todo/TodoToolBar.vue'

export default {
  components: { TodoToolBar },
  name: 'Project',
  data () {
    return {
      works: [],
    }
  },
}
</script>

<style lang="scss">
</style>
