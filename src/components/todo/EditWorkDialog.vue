<template>
  <q-dialog v-model="isOpen">
      <q-card class="my-card" :style="`width: 400px;`">
        <q-card-section class="row items-center q-py-xs">
          <div class="text-overline">{{getWorkById.name}} Edit</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section >
          <q-input />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Create work" />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditWorkDialog',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  watch: {
    isOpen (newVal) {
      if (newVal) {
        this.setEditWorkId(this.id)
        console.log(this.getWorkById)
      }
    }
  },
  computed: {
    ...mapGetters({
      getWorkById: 'todo/GET_WORK_BY_ID'
    })
  },
  methods: {
    ...mapActions({
      setEditWorkId: 'todo/SET_EDIT_WORK_ID'
    })
  }
}
</script>

<style>
</style>
