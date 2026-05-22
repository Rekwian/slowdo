<template lang="pug">
component(
  :class="[$style.button, variant]"
  :is="is"
  :to="to"
  v-bind="$attrs"
)
  slot
</template>

<script setup>
const props = defineProps({
  to: { default: undefined, type: [Object, String] },
  variant: { default: 'normal', type: String },
})

const css = useCssModule();

const is = computed(() => {
  if (props.to) {
    return resolveComponent('nuxt-link')
  }

  return 'button';
})

const variant = css[props.variant] ?? css.normal
</script>


<style module>
.button {
  appearance: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  padding: 0.75rem 2rem;
  text-decoration: none;
  transition: border-color var(--transition), color var(--transition),
    background-color var(--transition), box-shadow var(--transition);

  &:hover,
  &:focus {
    outline: none;
  }
}

.normal {
  background-color: var(--color-background);
  border: 1.5px solid var(--color-primary);
  color: var(--color-background-text);
  font-style: italic;

  &:hover,
  &:focus {
    background-color: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
    color: var(--color-primary-hover-text);
  }
}

.flat {
  background-color: var(--color-background);
  border: 1.5px solid var(--color-background);
  color: var(--color-background-text-muted);
  font-style: italic;
  text-decoration: underline;
  text-decoration-color: hsl(from var(--color-background-text-muted) h s 40%);

  &:hover,
  &:focus {
    background-color: var(--color-background-hover);
    border-color: var(--color-background-hover);
  }
}
</style>
