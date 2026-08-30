<template lang="pug">
p(:class="{ [$style.error]: true, [$style.hideDetails]: hideDetails }")
  span(v-for="error of errors") {{ error }}
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    errors: string[],
    hideDetails?: boolean,
  }>(),
  {
    hideDetails: false,
  }
)
</script>

<style module>
.error {
  font-size: 1rem;
  margin: 0;
  min-height: 2rem;
}

.hideDetails {
  min-height: 0;
}
</style>
