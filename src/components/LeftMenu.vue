<template>
  <div>
    <q-drawer v-if="isWorkspace" show-if-above v-model="left" side="left"
      bordered :width="200" :breakpoint="400" :mini="mini" dark>
      <!-- drawer content -->
      <q-scroll-area class="fit" :style="`overflow: hidden;`">
        <q-list padding>
          <div @click="handleLeftMenuClicked(menu[0])">
            <left-menu-item
              :active="menu[0].isActive"
              name="Dashboard"
              icon-name="dashboard"
            />
          </div>
          <div @click="handleLeftMenuClicked(menu[1])">
            <left-menu-item
              :active="menu[1].isActive"
              name="Wiki"
              icon-name="fab fa-wikipedia-w"
            />
          </div>
          <div @click="handleNewProjectDialogOpenClicked">
            <left-menu-item
              :active="false"
              name="Add Project"
              icon-name="fas fa-plus"
            />
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <new-project-dialog ref="newProjectDialog" />
  </div>
</template>

<script>
import LeftMenuItem from './LeftMenuItem.vue'
import NewProjectDialog from './project/NewProjectDialog.vue'

export default {
  components: { LeftMenuItem, NewProjectDialog },
  name: 'LeftMenu',
  props: {
    isWorkspace: String,
  },
  data () {
    return {
      left: false,
      mini: true,
      menu: [
        {
          name: 'dashboard',
          path: '/dashboard',
          isActive: true,
        },
        {
          name: 'wiki',
          path: '/wiki',
          isActive: false,
        },
        {
          name: 'todo',
          path: '/todo',
          isActive: false,
        }
      ],
    }
  },
  methods: {
    handleLeftMenuClicked (param) {
      this.menu.forEach((el) => {
        if (el.name === param.name) {
          el.isActive = true
        } else {
          el.isActive = false
        }
      })

      if (this.$route.path !== param.path) {
        this.$router.push(param.path)
      }
    },
    handleNewProjectDialogOpenClicked () {
      this.$refs.newProjectDialog.isOpen = true
    },
  }
}
</script>

<style>
</style>
