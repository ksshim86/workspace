<template>
  <div>
    <todo-tool-bar :works="works" />
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
          <q-btn outline @click="handleNewWorkBtnClicked">Create new work</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <new-work-dialog ref="newWorkDialog" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TodoToolBar from 'src/components/todo/TodoToolBar.vue'
import TodoList from 'src/components/todo/TodoList.vue'
import NewWorkDialog from 'src/components/todo/NewWorkDialog.vue'

export default {
  components: { TodoToolBar, TodoList, NewWorkDialog },
  name: 'TodoPage',
  data () {
    return {
      isWork: false,
      isNewWorkDialog: false
    }
  },
  created () {
    this.fetchWorks()
  },
  mounted () {
    const { scroll } = this.$refs

    if (scroll) {
      scroll.$el.firstElementChild.firstElementChild.className = 'absolute full-width row'
    }
  },
  watch: {
    selectedWork (work) {
      console.log(work)
    },
    works (works) {
      if (works !== undefined && works.length > 0) {
        this.isWork = true
      }
    }
  },
  computed: {
    isDisableCreateWorkBtn () {
      return !(this.newWork.name && this.newWork.key)
    },
    ...mapGetters({
      selectedWork: 'todo/GET_SELECTED_WORK',
      works: 'todo/GET_WORKS'
    })
  },
  methods: {
    handleNewWorkBtnClicked () {
      this.$refs.newWorkDialog.isOpen = true
    },
    ...mapActions({
      fetchWorks: 'todo/FETCH_WORKS'
    })
  }
}
</script>

<style lang="scss">
  .todo-page {
    background-color: #36393F;
    height: -webkit-fill-available;
  }
</style>
