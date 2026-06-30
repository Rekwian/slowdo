<template lang="pug">
select(v-model="currentLocale" :class="$style.select")
  option(
    v-for="{ code, name } in locales"
    :key="code"
    :value="code"
  ) {{ name }}
</template>

<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();

const currentLocale = ref(locale.value);

watch(currentLocale, setLocale);
</script>

<style module>
.select {
  background-color: transparent;
  border: 0;
  color: var(--color-background-text-muted);
  cursor: pointer;
}
</style>
