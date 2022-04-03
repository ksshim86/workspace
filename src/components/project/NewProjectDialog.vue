<template>
  <div>
    <q-dialog
      v-model="isOpen"
      no-backdrop-dismiss
      no-esc-dismiss
      @hide="dialogHide"
    >
      <q-card class="my-card" style="width: 500px;">
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
            <q-btn v-if="isAvatar" fab-mini color="indigo" class="float-left q-ma-sm"
              @click="uploadClick()">
              <q-avatar icon="far fa-image" />
              <q-tooltip content-class="bg-dark text-white"
               :offset="[10, 10]">
                <strong>아바타를 등록하세요.</strong>
              </q-tooltip>
            </q-btn>
            <q-img
              v-else
              class="float-left q-ma-sm"
              width="60px"
              :ratio="1"
              :src="project.avatar"
              @mouseenter="imgOver = true"
              @mouseleave="imgOver = false"
            >
              <div v-if="imgOver"
                class="absolute-full flex flex-center non-selectable cursor-pointer"
                @click="uploadClick()"
              >
                변경
              </div>
            </q-img>
            <q-file
              ref="avatarFile"
              v-show="false"
              :value="files"
              label="Select Avatar image"
              label-color="white"
              @input="updateFiles"
            >
            </q-file>
            <q-input
              v-model="project.name"
              label="프로젝트 이름"
              :rules="[
                val => val && val.length > 0 || '프로젝트 이름을 입력하세요',
                val => val && val.match(regExp) == null
                  || regExpComment
              ]"
            />
          </q-card-section>
          <q-card-section align="right">
            <q-btn flat label="닫기" v-close-popup />
            <q-btn flat type="submit" label="등록" />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapActions } from 'vuex'

export default {
  name: 'NewProjectDialog',
  data () {
    return {
      isOpen: false,
      project: {
        name: '',
        initial: '',
        avatar: '',
        avatarName: '',
      },
      files: null,
      imageUploadDialog: false,
      imgOver: false,
      classObj: {
        defaultCol: 'col text-center q-pa-md',
        npdCol: 'npd-col',
        npdColDark: 'npd-col-dark',
      },
      regExp: /\/|\\|:|\*|\?|"|<|>|\/|\|/g,
      regExpComment: '다음 문자를 사용할 수 없습니다 \\ / : * ? " < > |',
    }
  },
  computed: {
    isAvatar () {
      return this.project.avatar === ''
    },
    initial () {
      if (this.project.name.length > 0) {
        return this.project.name.charAt(0)
      }

      return ''
    }
  },
  methods: {
    dialogOpen () {
      this.isOpen = true
    },
    uploadClick () {
      this.$refs.avatarFile.pickFiles()
    },
    async onSubmit () {
      this.project.initial = this.initial

      const obj = await ipcRenderer.invoke('insertProject', this.project)

      if (obj.result) {
        this.$q.notify({
          type: 'positive',
          message: '프로젝트 생성 완료',
          position: 'bottom-right',
          timeout: 2500,
        })

        this.fetchProjects()
        this.isOpen = false
      }
    },
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
        initial: '',
        avatar: '',
        avatarName: '',
      }
      this.files = null
    },
    ...mapActions({
      fetchProjects: 'project/FETCH_PROJECTS'
    }),
  },
}
</script>

<style>
  .npd-col {
    border: 1px solid;
    border-color: lightsteelblue;
  }
  .npd-col-dark {
    background-color: #1b1c1d;
  }
  .custom-img {
    width: 100px;
    height: 100px;
  }
</style>
