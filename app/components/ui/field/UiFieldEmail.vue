<template lang="pug">
ui-field-text(
  autocomplete="off"
  type="email"
  :name="name"
  :placeholder="placeholder"
  v-model="model"
)
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string,
  name?: string
}>()

const model = defineModel();
</script>
