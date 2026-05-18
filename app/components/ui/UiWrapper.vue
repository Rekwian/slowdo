<template lang="pug">
div(:class="$style.wrapper")
  div
    h1(:class="$style.title") {{ title }}
    h2(v-if="subtitle" :class="$style.subtitle") {{ subtitle }}

  div
    slot

  div
    slot(name="actions")
</template>

<script setup>
defineProps({
  title: { required: true, type: String },
  subtitle: { default: undefined, type: String }
})
</script>

<style module>
.wrapper {
  align-items: center;
  animation: fadeUp 0.5s ease both;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-content: center;
  text-align: center;
}

.title {
  color: var(--color-background-text);
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 400;
  line-height: 1.4;
  max-width: 560px;
}

.subtitle {
  color: var(--color-background-text-muted);
  font-size: 1rem;
  letter-spacing: 0.06em;
  margin-top: 0.75rem;
  text-transform: lowercase;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
