<template>
  <q-dialog v-model="isOpen" no-backdrop-dismiss no-esc-dismiss>
    <q-card class="my-card" style="width: 700px;">
      <q-card-section class="row items-center q-py-xs">
        <div class="text-overline">New Project</div>
        <q-space />
        <q-btn icon="crop_square" flat dense />
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
            label="프로젝트 이름"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-file
            :value="files"
            @input="updateFiles"
            label="프로젝트 이미지 추가"
          >
            <template v-slot:before>
              <q-avatar square size="50px">
                <q-img
                  :src="renderImg"
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
        image: null,
      },
      files: null,
      renderImg: '',
    }
  },
  methods: {
    onSubmit () {},
    updateFiles (newFiles) {
      const reader = new FileReader()
      reader.readAsDataURL(newFiles)
      // eslint-disable-next-line func-names
      reader.onload = function () {
        console.log(reader.result)
        this.renderImg = reader.result
      }.bind(this)
      // eslint-disable-next-line func-names
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
  },
}
</script>

<style>
</style>
