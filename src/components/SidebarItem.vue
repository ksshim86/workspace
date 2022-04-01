<template>
  <q-item :active="active" clickable v-ripple>
    <q-item-section avatar>
      <q-icon v-if="avatar === undefined" :name="iconName"></q-icon>
      <q-img
        v-else
        width="24px"
        :ratio="1"
        :src="avatar"
      />
    </q-item-section>
    <q-item-section class="text-weight-bold">{{name}}</q-item-section>
    <q-tooltip v-if="miniState" content-class="bg-dark text-white"
      anchor="center right" self="center left" :offset="[10, 10]">
      <strong>{{name}}</strong>
    </q-tooltip>
  </q-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    active: Boolean,
    name: String,
    iconName: String,
    miniState: Boolean,
    avatar: String,
  },
}
</script>

<style lang="scss">
</style>
