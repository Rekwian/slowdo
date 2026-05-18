<template lang="pug">
component(
  :class="$style.button"
  :is="is"
  :to="to"
  v-bind="$attrs"
)
  slot
</template>

<script setup>
const props = defineProps({
  to: { default: undefined, type: [Object, String]}
})
const is = computed(() => {
  if (props.to) {
    return resolveComponent('nuxt-link')
  }

  return 'button';
})
</script>


<style module>
.button {
  appearance: none;
  background-color: transparent;
  border: 1.5px solid var(--color-main);
  border-radius: var(--radius-pill);
  color: var(--color-background-text);
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.04em;
  padding: 0.75rem 2rem;
  text-decoration: none;
  transition: border-color var(--transition), color var(--transition),
    background-color var(--transition), box-shadow var(--transition);

  &:hover,
  &:focus {
    background-color: var(--color-main-glow);
    border-color: var(--color-main-hover);
    box-shadow: 0 0 18px var(--color-main-glow);
    color: var(--color-main-hover);
    outline: none;
  }
}
</style>
