<template lang="pug">
textarea(v-model="model" class="input" :name="name")
</template>

<script setup lang="ts">
const model = defineModel<string|null>();

defineProps<{
  name?: string
}>()
</script>
