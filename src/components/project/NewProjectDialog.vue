<template>
  <q-dialog
    v-model="isOpen"
    no-backdrop-dismiss
    no-esc-dismiss
    @hide="dialogHide"
  >
    <q-card class="my-card" style="width: 500px;">
      <q-card-section class="row items-center q-py-xs">
        <div class="text-overline">New Project</div>
        <q-space />
        <q-btn icon="close" flat dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-form
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <q-card-section>
          <q-input
            v-model="project.name"
            label="Input project name"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-file
            :value="files"
            label="Select Avatar image"
            label-color="white"
            @input="updateFiles"
          >
            <template v-slot:before>
              <q-avatar square size="50px">
                <q-icon v-if="isAvatar" name="far fa-image" />
                <q-img
                  v-else
                  :src="project.avatar"
                />
              </q-avatar>
            </template>
          </q-file>
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="닫기" v-close-popup />
          <q-btn flat type="submit" label="등록" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'NewProjectDialog',
  data () {
    return {
      isOpen: false,
      project: {
        name: '',
        avatar: '',
        avatarName: '',
      },
      files: null,
    }
  },
  computed: {
    isAvatar () {
      return this.project.avatar === ''
    }
  },
  methods: {
    onSubmit () {},
    updateFiles (newFiles) {
      const reader = new FileReader()

      this.files = newFiles
      this.project.avatarName = newFiles.name

      reader.readAsDataURL(newFiles)

      reader.onload = function onload () {
        this.project.avatar = reader.result
      }.bind(this)

      reader.onerror = function onerror (error) {
        console.log('Error: ', error)
      }
    },
    dialogHide () {
      this.project = {
        name: '',
        avatar: '',
        avatarName: '',
      }
      this.files = null
    },
  },
}
</script>

<style>
</style>
