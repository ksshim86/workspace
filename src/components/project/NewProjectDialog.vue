<template>
  <div>
    <q-dialog
      v-model="isOpen"
      no-backdrop-dismiss
      no-esc-dismiss
      @hide="dialogHide"
    >
      <q-card class="my-card" dark style="width: 500px;">
        <q-card-section class="row items-center q-py-xs">
          <div class="text-overline">새로운 프로젝트 등록</div>
          <q-space />
          <q-btn icon="close" flat dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-subtitle2">프로젝트를 만들어 업무와 할 일을 관리하세요.</div>
        </q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
        >
          <q-card-section>
            <q-btn fab-mini color="indigo" class="float-left q-ma-sm"
              @click="imageUploadDialog = true">
              <q-avatar text-color="white" icon="far fa-image" />
            </q-btn>
            <q-input
              dark
              v-model="project.name"
              label="프로젝트 이름"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <!-- <q-file
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
            </q-file> -->
          </q-card-section>
          <q-card-section align="right">
            <q-btn flat label="닫기" v-close-popup />
            <q-btn flat type="submit" label="등록" />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="imageUploadDialog"
      persistent transition-show="scale" transition-hide="scale">
      <q-card class="my-card" dark style="width: 500px">
        <q-card-section class="row items-center q-py-xs">
          <div class="text-overline">아바타 선택</div>
          <q-space />
          <q-btn icon="close" flat dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
        >
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col text-center q-pa-md" style="background-color: #1b1c1d;">
                <div class="row full-height items-center justify-center">
                  <q-btn fab-mini color="indigo">
                    <q-avatar size="100px" text-color="white" icon="far fa-image" />
                  </q-btn>
                  <div class="text-caption q-mt-md">이미지 업로드</div>
                </div>
              </div>
              <div class="col text-center q-pa-md" style="background-color: #1b1c1d;">
                <div class="row full-height items-center justify-center">
                  <q-input square outlined dark v-model="text"
                    mask="X" placeholder="한 문자만 입력"
                  />
                  <div class="text-caption q-mt-md">이니셜 입력</div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section align="right">
            <q-btn flat label="취소" v-close-popup />
            <q-btn flat type="submit" label="완료" />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
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
      imageUploadDialog: false,
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