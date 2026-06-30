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
  min-height: 2rem;
  font-size: 1rem;
}
</style>
