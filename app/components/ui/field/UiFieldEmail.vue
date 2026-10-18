<template lang="pug">
ui-field-text(
  autocomplete="email"
  type="email"
  :name="name"
  :placeholder="placeholder"
  v-model="model"
  v-bind="$attrs"
)
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string,
  name?: string
}>()

const model = defineModel();
</script>
