<template>
  <component
    :class="[$style.button, variantClass]"
    :is="is"
    :to="to"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

const { variant = 'normal', to } = defineProps<{
  to?: string | object,
  variant?: 'normal' | 'flat' | 'link',
  type?: ButtonHTMLAttributes['type'],
  disabled?: ButtonHTMLAttributes['disabled'],
}>()

defineEmits(['click']);

const css = useCssModule();

const is = computed(() => {
  if (to) {
    return resolveComponent('nuxt-link')
  }

  return 'button';
})

const variantClass = css[variant] ?? css.normal
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
  border: 0;
  color: var(--color-background-text);
  font-style: italic;

  &:not(:disabled) {
    &:hover,
    &:focus {
      background-color: var(--color-background-hover);
      color: var(--color-background-hover-text);
    }
  }

  &:disabled {
    background-color: hsla(from var(--color-background) h s l / 0.3);
    color: hsl(from var(--color-background-text) h 90% 30%);
  }
}

.flat {
  background-color: var(--color-background);
  border: 1.5px solid var(--color-background);
  color: var(--color-background-text-muted);
  font-style: italic;
  text-decoration-color: hsl(from var(--color-background-text-muted) h s 40%);

  &:not(:disabled) {
    &:hover,
    &:focus {
      background-color: var(--color-background-hover);
      color: var(--color-background-hover-text);
    }
  }
}

.link {
  background-color: transparent;
  border: 0;
  color: var(--color-background-text);

  &:not(:disabled) {
    &:hover,
    &:focus {
      background-color: var(--color-background-hover);
      border-color: var(--color-background-hover);
      color: var(--color-background-hover-text);
    }
  }
}
</style>
