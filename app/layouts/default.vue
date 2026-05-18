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
}

.localSelect {
  background-color: transparent;
  border: 0;
  bottom: 1rem;
  color: var(--color-background-text);
  left: 1rem;
  opacity: 0.5;
  position: absolute;
  z-index: 100;

  option {
    color: var(--color-background-text);
  }
}
</style>
