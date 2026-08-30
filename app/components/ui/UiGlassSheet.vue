<template lang="pug">
component(:is="tag" :class="$style.glass")
  slot
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ tag?: string }>(),
  { tag: 'div' }
);
</script>

<style module>
.glass {
  background: linear-gradient(
    155deg,
    hsl(from var(--color-background) h s 90%) 40%,
    var(--color-background)
  );
  background-color: var(--color-background);
  border: 1px solid var(--color-background);
  border-radius: 1rem;
  box-shadow: 0 0 20px -7px hsla(0 0% 0% / 0.2);
  padding: 2rem;
}

@media (prefers-color-scheme: dark) {
  .glass {
    background: linear-gradient(
      155deg,
      hsl(from var(--color-background) h s 5%) 40%,
      var(--color-background)
    );
    box-shadow: 0 0 20px -7px hsl(0 0% 0%);
  }
}
</style>
