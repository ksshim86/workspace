<template>
  <q-drawer v-if="isWorkspace" show-if-above v-model="left" side="left"
    bordered :width="200" :breakpoint="400" :mini="mini" dark>
    <!-- drawer content -->
    <q-scroll-area class="fit" :style="`overflow: hidden;`">
      <q-list padding>
        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="dashboard"></q-icon>
          </q-item-section>
          <q-tooltip class="bg-red text-black"
            anchor="center right" self="center left" :offset="[10, 10]">
            <strong>Dashboard</strong>
          </q-tooltip>
        </q-item>

        <!-- <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star"></q-icon>
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send"></q-icon>
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send"></q-icon>
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="inbox"></q-icon>
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item> -->
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
export default {
  name: 'LeftMenu',
  props: {
    isWorkspace: Boolean,
  },
  data () {
    return {
      left: false,
      mini: true,
    }
  }
}
</script>

<style>
</style>
