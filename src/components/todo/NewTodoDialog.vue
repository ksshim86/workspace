<template>
  <q-dialog v-model="isOpen" no-backdrop-dismiss no-esc-dismiss>
    <q-card class="my-card" style="max-width: 1200px;width:700px;">
      <q-card-section class="row items-center q-py-xs">
        <div class="text-overline">Create</div>
        <q-space />
        <q-btn icon="crop_square" flat dense />
        <q-btn icon="close" flat dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-scroll-area :style="`overflow: hidden; height: 500px;`">
          <q-card-section>
            <q-input
              v-model="todo.title"
              dense
              label="Title"
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-editor v-model="todo.content" min-height="10rem" class="q-mb-md" />
            <q-select
              dense
              class="q-mb-md"
              label="tags"
              v-model="tags"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="filterFn"
            />
            <div class="q-mb-md row items-start">
              <q-input v-model="rangeDt" style="width: 230px;" label="due date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="selectedRangeDt" minimal range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-file clearable class="q-mb-md"
              dense use-chips multiple append
              v-model="files" label="Pick files" counter>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>
        </q-scroll-area>
        <q-card-section align="right">
          <q-btn flat label="닫기" v-close-popup />
          <q-btn flat type="submit" label="등록" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

export default {
  name: 'NewTodoDialog',
  data () {
    return {
      isOpen: true,
      isAttachment: true,
      todo: {
        no: 0,
        workId: 0,
        title: '',
        content: '',
        startDt: '',
        dueDt: '',
        fileId: ''
      },
      files: null,
      tags: null,
      filterOptions: stringOptions,
      selectedRangeDt: { from: '', to: '' }
    }
  },
  computed: {
    rangeDt () {
      if (this.selectedRangeDt.from === undefined) {
        return this.selectedRangeDt
      }

      if (this.selectedRangeDt.from === '' || this.selectedRangeDt.to === '') {
        return ''
      }

      return `${this.selectedRangeDt.from} ~ ${this.selectedRangeDt.to}`
    }
  },
  methods: {
    factoryFn (files) {
      console.log(files)
      return false
    },
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = stringOptions
        } else {
          const needle = val.toLowerCase()
          this.filterOptions = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    createValue (val, done) {
      if (val.length > 0) {
        const tags = (this.tags || []).slice()

        val
          .split(/[,;|]+/)
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
          .forEach((v) => {
            if (stringOptions.includes(v) === false) {
              stringOptions.push(v)
            }
            if (tags.includes(v) === false) {
              tags.push(v)
            }
          })

        done(null)
        this.tags = tags
      }
    },
    onSubmit () {

    }
  }
}
</script>

<style>
</style>
