<template lang="pug">
component(:is="is" :to="linked && $localePath('index')" :class="$style.logoWrapper")
  img(src="/logo.svg" :class="$style.logo" alt="")
  | Slowdo
</template>

<script setup lang="ts">
const { linked = true } = defineProps<{
  linked?: boolean
}>()

const is = computed(() => linked ? resolveComponent('NuxtLink') : 'div');
</script>

<style module>
.logo {
  height: 100%;
  max-width: 4rem;
}

.logoWrapper {
  align-items: center;
  color: var(--color-background-text);
  display: flex;
  gap: 1rem;
  max-height: 2rem;
  text-decoration: none;
  width: max-content;
}
</style>
