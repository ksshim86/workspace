<template>
  <div class="row items-start full-width">
    <div v-for="todo in todos" :key="todo.id">
      <todo :todo="todo" />
    </div>
    <todo :todo="{key: 'JS', no: 99, title: 'test'}" />
    <div v-if="todos.length === 0">
      todo를 등록하세요.
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
