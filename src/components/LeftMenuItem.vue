<template>
  <q-item :active="active" clickable v-ripple>
    <q-item-section avatar>
      <q-icon :name="iconName"></q-icon>
    </q-item-section>
    <q-tooltip content-class="bg-dark text-white"
      anchor="center right" self="center left" :offset="[10, 10]">
      <strong>{{name}}</strong>
    </q-tooltip>
  </q-item>
</template>

<script>
export default {
  name: 'LeftMenuItem',
  props: {
    active: Boolean,
    name: String,
    iconName: String,
  },
}
</script>

<style>
</style>
