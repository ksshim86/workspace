<template>
  <div class="row items-start full-width">
    <div v-for="index in 10" :key="index">
      <todo :id="index" />
    </div>
  </div>
</template>

<script>
import Todo from './Todo.vue'

export default {
  components: { Todo },
  name: 'TodoList',
  data () {
    return {
      todos: [{}, {}]
    }
  }
}
</script>

<style>

</style>
