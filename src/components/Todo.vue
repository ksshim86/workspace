<template>
  <q-card class="todo-card q-ma-md" flat style="max-width: 433px;" dark>
    <q-card-section class="row items-center q-py-sm">
      <div class="text-overline">
        #KLID-{{ id }}
      </div>
      <q-chip dense color="primary" text-color="white">
        Todo
      </q-chip>
      <q-chip dense color="orange" text-color="white">
        Progress
      </q-chip>
      <q-chip icon="o_done" dense color="red" text-color="white">
        Done
      </q-chip>
      <q-space />
      <q-btn icon="open_in_new" flat round dense />
      <q-btn icon="more_vert" flat round dense />
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-sm" :style="`height: 150px;`">
      <div class="text-h5 q-my-xs">Title</div>
      <div class="text-caption text-grey">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </q-card-section>

    <q-separator />
    <q-card-actions class="q-py-xs">
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
      <q-chip size="sm" color="white" clickable icon="label">
        label
      </q-chip>
    </q-card-actions>
    <q-card-actions align="right" class="q-py-sm">
      <q-btn flat>
        21.05.24 - 21.05.30
      </q-btn>
      <q-space />
      <q-btn flat round icon="o_attachment" :style="{ transform: 'rotate(135deg)'}" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    id: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
  .todo-card:hover {
    box-shadow: 0 0 0 1px orange inset !important;
  }
</style>
