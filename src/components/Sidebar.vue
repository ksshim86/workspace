<template>
  <div>
    <!-- <q-drawer show-if-above v-model="left" side="left"
      bordered :width="200" :breakpoint="400" dark> -->
    <q-drawer
      v-model="drawer"
      show-if-above

      :mini="!drawer || miniState"

      :width="230"
      :breakpoint="500"
      bordered
    >
      <!-- drawer content -->
      <q-scroll-area class="fit" :style="`overflow: hidden;`">
        <q-list padding>
          <div @click="handleLeftMenuClicked(menu[0])">
            <sidebar-item
              :active="menu[0].isActive"
              name="Dashboard"
              icon-name="space_dashboard"
              :miniState="!drawer || miniState"
            />
          </div>
          <div @click="handleLeftMenuClicked(menu[1])">
            <sidebar-item
              :active="menu[1].isActive"
              name="Wiki"
              icon-name="fab fa-wikipedia-w"
              :miniState="!drawer || miniState"
            />
          </div>
          <div @click="handleNewProjectDialogOpenClicked">
            <sidebar-item
              :active="false"
              name="Add Project"
              icon-name="fas fa-plus"
              :miniState="!drawer || miniState"
            />
          </div>
          <q-separator />
          <div>
            <q-item :active="false" clickable v-ripple @click="isDark = !isDark">
              <q-item-section avatar v-if="!miniState">
                <q-icon v-if="isDark" name="light_mode"></q-icon>
                <q-icon v-else name="dark_mode"></q-icon>
              </q-item-section>
              <q-item-section v-if="!miniState" class="text-weight-bold">
                <div v-if="isDark">Light Mode</div>
                <div v-else>Dark Mode</div>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle dense size="xs" color="orange"
                  v-model="isDark" @click="isDark = !isDark" />
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-scroll-area>
      <div class="absolute" style="top: 15px; right: -17px">
        <q-btn
          round
          unelevated
          size="10px"
          color="orange"
          :icon="miniIcon"
          @click="drawerClick"
        />
      </div>
    </q-drawer>
    <new-project-dialog ref="newProjectDialog" />
  </div>
</template>

<script>
import { Dark } from 'quasar'
import SidebarItem from './SidebarItem.vue'
import NewProjectDialog from './project/NewProjectDialog.vue'

export default {
  components: { SidebarItem, NewProjectDialog },
  name: 'Sidebar',
  data () {
    return {
      drawer: false,
      miniState: false,
      miniIcon: 'chevron_left',
      isDark: false,
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
  watch: {
    isDark (val) {
      Dark.set(val)
    }
  },
  methods: {
    drawerClick () {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false
        this.miniIcon = 'chevron_left'
      } else {
        this.miniState = true
        this.miniIcon = 'chevron_right'
      }
    },
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
      this.$refs.newProjectDialog.dialogOpen()
    },
  }
}
</script>

<style>
</style>
