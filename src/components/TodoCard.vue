<template>
  <q-card class="my-card q-ma-md" flat bordered style="max-width: 400px;">
    <q-card-section>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">#KLID-001</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
        <div class="text-caption text-grey">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" />
      <q-btn flat>
        7:30PM
      </q-btn>
      <q-btn flat color="primary">
        Reserve
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'TodoCard'
}
</script>

<style>

</style>
