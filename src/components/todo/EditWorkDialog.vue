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
          <q-input v-model="work.name" label="name" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn class="text-red" flat label="삭제" v-close-popup />
          <q-btn flat label="수정" @click="handleEditWorkBtnClicked" />
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
      isOpen: false,
      work: {}
    }
  },
  watch: {
    isOpen (newVal) {
      if (newVal) {
        this.setEditWorkId(this.id)
        this.work = JSON.parse(JSON.stringify(this.getWorkById))
      }
    }
  },
  computed: {
    ...mapGetters({
      getWorkById: 'todo/GET_WORK_BY_ID'
    })
  },
  methods: {
    async handleEditWorkBtnClicked () {
      const res = await this.setEditWork(this.work)

      console.log(res)
    },
    ...mapActions({
      setEditWorkId: 'todo/SET_EDIT_WORK_ID',
      setEditWork: 'todo/SET_EDIT_WORK'
    })
  }
}
</script>

<style>
</style>
