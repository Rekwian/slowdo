<template lang="pug">
textarea(
  v-model="model"
  class="input"
  :name="name"
  v-bind="$attrs"
)
</template>

<script setup lang="ts">
const model = defineModel<string|null>();

defineProps<{
  name?: string
}>()
</script>
