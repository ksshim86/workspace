<template>
  <q-page>
    <div class="row no-wrap shadow-1">
      <q-toolbar class="q-pl-lg">
        <q-toolbar-title>
          <q-breadcrumbs align="left">
            <q-breadcrumbs-el :label="project.name" />
            <q-breadcrumbs-el label="전체" />
          </q-breadcrumbs>
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" />
      </q-toolbar>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Project',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('projectStore', {
      project: 'GET_PROJECT'
    })
  },
}
</script>

<style lang="scss">
</style>
