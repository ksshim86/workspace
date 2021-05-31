<template>
  <q-dialog v-model="isOpen">
      <q-card class="my-card" :style="`width: 400px;`">
        <q-card-section class="row items-center q-py-xs">
          <div class="text-overline">Create new work</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section >
          <q-input v-model="newWork.name" label="name" />
          <q-input v-model="newWork.key" label="key" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Create work"
           @click="handleNewWorkClicked" :disable="isDisableCreateWorkBtn" />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NewWorkDialog',
  data () {
    return {
      newWork: {
        name: '',
        key: ''
      },
      isOpen: false
    }
  },
  computed: {
    isDisableCreateWorkBtn () {
      return !(this.newWork.name && this.newWork.key)
    }
  },
  methods: {
    async handleNewWorkClicked () {
      const { result, message } = await this.setWork(this.newWork)

      if (result) {
        this.isOpen = false

        this.newWork = {
          name: '',
          key: ''
        }

        this.notifyCreatedWork()
      } else {
        this.$q.dialog({
          title: 'Failed',
          message
        })
        // !TODO: 추후에 alert dialog는 컴포넌트화 필요
      }
    },
    notifyCreatedWork () {
      this.$q.notify({
        type: 'positive',
        color: 'light-blue-6',
        message: 'Created new work',
        position: 'bottom-right'
      })
    },
    ...mapActions({
      setWork: 'todo/SET_WORK'
    })
  }
}
</script>

<style>
</style>
