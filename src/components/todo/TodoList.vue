<template>
  <div class="row items-start full-width">
    <div v-for="todo in todos" :key="todo.id">
      <todo :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Todo from './Todo.vue'

export default {
  components: { Todo },
  name: 'TodoList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      todos: 'todo/GET_TODOS'
    })
  }
}
</script>

<style>

</style>
