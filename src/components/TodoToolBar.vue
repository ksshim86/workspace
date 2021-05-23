<template>
  <q-toolbar class="shadow-1 text-white" style="min-height: 50px; background-color: #24292E;">
    <q-toolbar-title>
      <q-btn flat icon="tag" label="___">
        <q-menu fit anchor="bottom left" self="top left">
          <q-item clickable>
            <q-item-section>New tab</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>New incognito tab</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </q-toolbar-title>
    <q-select
      ref="search" dark dense standout use-input hide-selected
      class="GL__toolbar-select"
      color="black" :stack-label="false" label="검색하기"
      v-model="text" :options="filteredOptions" @filter="filter"
      style="width: 250px;"
    >

      <template v-slot:append>
        <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section>
            <div class="text-center">
              <q-spinner-pie
                color="grey-5"
                size="24px"
              />
            </div>
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:option="scope">
        <q-item
          v-bind="scope.itemProps"
          v-on="scope.itemEvents"
          class="GL__select-GL__menu-link"
        >
          <q-item-section side>
            <q-icon name="collections_bookmark" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="scope.opt.label" />
          </q-item-section>
          <q-item-section side :class="{ 'default-type': !scope.opt.type }">
            <q-btn outline dense no-caps text-color="blue-grey-5"
              size="12px" class="bg-grey-1 q-px-sm">
              {{ scope.opt.type || 'Jump to' }}
              <q-icon name="subdirectory_arrow_left" size="14px" />
            </q-btn>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

  </q-toolbar>
</template>

<script>

const stringOptions = [
  'quasarframework/quasar',
  'quasarframework/quasar-awesome'
]

export default {
  name: 'ToolBar',
  data() {
    return {
      text: '',
      options: null,
      filteredOptions: []
    }
  },
  methods: {
    filter(val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.options = stringOptions
          this.$refs.search.filter('')
        }, 2000)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map((op) => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          {
            label: val,
            type: 'In this repository'
          },
          {
            label: val,
            type: 'All GitHub'
          },
          ...this.options
            .filter((op) => op.toLowerCase().includes(val.toLowerCase()))
            .map((op) => ({ label: op }))
        ]
      })
    }
  }
}
</script>

<style lang="scss">
.GL {
  &__select-GL__menu-link {
    .default-type {
      visibility: hidden;
    }
    &:hover {
      background: #0366d6;
      color: white;
      .q-item__section--side {
        color: white;
      }
      .default-type {
        visibility: visible;
      }
    }
  }
  &__toolbar-link {
    a {
      color: white;
      text-decoration: none;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  &__menu-link:hover {
    background: #0366d6;
    color: white;
  }
  &__menu-link-signed-in,
  &__menu-link-status {
    &:hover {
      & > div {
        background: white !important;
      }
    }
  }
  &__menu-link-status {
    color: $blue-grey-6;
    &:hover {
      color: $light-blue-9;
    }
  }
  &__toolbar-select.q-field--focused {
    width: 350px !important;
    .q-field__append {
      display: none;
    }
  }
}
</style>
