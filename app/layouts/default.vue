<template lang="pug">
div(:class="$style.layout")
  slot
select(:class="$style.localSelect" v-model="currentLocale")
  option(v-for="{code} in locales" :key="code" :value="code") {{ code }}
</template>

<script setup>
const { locales, setLocale, locale } = useI18n()
const currentLocale = ref(localStorage.getItem('locale') || locale.value);

watch(currentLocale, (code) => {
  setLocale(code)
  localStorage.setItem('locale', code)
})
</script>

<style module>
.layout {
  align-items: center;
  background-color: var(--color-background);
  box-sizing: border-box;
  color: var(--color-background-text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100dvh;
  padding: 2rem;
  width: 100vw;

  /* Subtle radial glow at the top-center for depth */
  background-image: radial-gradient(
    ellipse 70% 40% at 50% 0%,
    rgba(126, 200, 184, 0.05) 0%,
    transparent 70%
  );
}

.localSelect {
  background-color: transparent;
  border: 0;
  color: var(--color-background-text);
  opacity: 0.5;
  color: white;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 100;

  option {
    color: var(--color-background-text);
  }
}
</style>
