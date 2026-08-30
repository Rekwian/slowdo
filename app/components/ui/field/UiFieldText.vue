<template lang="pug">
input(
  autocomplete="off"
  type="text"
  :name="name"
  :placeholder="placeholder"
  v-model="model"
  class="input"
)
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string,
  name?: string
}>()

const model = defineModel();
</script>
