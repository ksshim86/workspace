<template>
  <div class="row no-wrap">
    <q-toolbar
      class="col text-white q-pa-none"
      style="min-height: 50px; min-width: 150px; background-color: #24292E;"
    >
      <q-btn-dropdown
        flat
        class="full-width full-height work-btn-dropdown"
        align="left"
      >
        <template v-slot:label>
          <div class="ellipsis">
            {{selectedWork.name ? selectedWork.name : 'ALL'}}
          </div>
        </template>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="setSelectedWork({})">
            <q-item-section>ALL</q-item-section>
          </q-item>
          <q-separator />
          <q-item
            v-for="work in works"
            :key="work.id"
            clickable
            class="q-pr-xs"
          >
            <q-item-section v-close-popup @click="setSelectedWork(work)">
              {{work.name}}
            </q-item-section>
            <q-item-section side>
              <q-btn flat dense @click="handleEditWorkBtnClicked(work.id)">
                <q-icon name="more_vert" size="xs" />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
    <q-toolbar class="text-white" style="min-height: 50px; background-color: #24292E;">
      <q-space />
      <q-btn icon="menu" flat round dense>
        <q-menu fit anchor="bottom left" self="top left">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                @click="handleNewWorkBtnClicked"
              >
                <q-item-section>Work 등록</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
      </q-btn>
    </q-toolbar>
    <new-work-dialog ref="newWorkDialog" />
    <edit-work-dialog :id="editWorkId" ref="editWorkDialog" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditWorkDialog from './EditWorkDialog.vue'
import NewWorkDialog from './NewWorkDialog.vue'

export default {
  components: { NewWorkDialog, EditWorkDialog },
  name: 'TodoToolBar',
  props: {
    works: {
      type: Array,
      default: Object
    }
  },
  data () {
    return {
      editWorkId: 0,
      tab: 'mails'
    }
  },
  created () {
    // work 조회
  },
  computed: {
    ...mapGetters({
      selectedWork: 'todo/GET_SELECTED_WORK'
    })
  },
  methods: {
    handleNewWorkBtnClicked () {
      this.$refs.newWorkDialog.isOpen = true
    },
    handleEditWorkBtnClicked (id) {
      this.editWorkId = id
      this.$refs.editWorkDialog.isOpen = true
    },
    ...mapActions({
      setSelectedWork: 'todo/SET_SELECTED_WORK'
    })
  }
}
</script>

<style lang="scss">
  .work-btn-dropdown i {
    position: absolute;
    right: 0px;
  }
</style>
