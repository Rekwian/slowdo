<template lang="pug">
p(:class="$style.error")
  span(v-for="error of errors") {{ error }}
</template>

<script setup lang="ts">
defineProps<{
  errors: string[],
}>()
</script>

<style module>
.error {
  font-size: 1rem;
  min-height: 2rem;
}
</style>
