<template>
  <div :class="$style.wrapper">
    <div>
      <h1>{{ title }}</h1>
      <h2 v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</h2>
    </div>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
    <div v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  subtitle?: string
}>()
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

.subtitle {
  color: var(--color-background-text-muted);
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
