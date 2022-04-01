<template>
  <q-item :active="active" clickable v-ripple>
    <q-item-section avatar>
      <q-icon v-if="!isProject" :name="iconName"></q-icon>
      <q-avatar v-else size="24px" font-size="22px">
        <q-img
          v-if="avatar.length > 0"
          width="24px"
          :ratio="1"
          :src="avatar"
        />
        <div class="text-uppercase" else>{{initial}}</div>

      </q-avatar>
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
    isProject: Boolean,
    active: Boolean,
    name: String,
    iconName: String,
    miniState: Boolean,
    avatar: String,
    initial: String,
  },
}
</script>

<style lang="scss">
</style>
