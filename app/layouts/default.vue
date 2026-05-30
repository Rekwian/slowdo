<template lang="pug">
div(:class="$style.layout")
  header(:class="$style.header")
    ui-button(variant="link" :to="$localePath('app-navigation')") menu
  main(:class="$style.main")
    slot
  footer(:class="$style.footer")
    select(:class="$style.localSelect" v-model="currentLocale")
      option(v-for="{code} in locales" :key="code" :value="code") {{ code }}
    slot(name="actions")
</template>

<script setup>
const { locales, setLocale, locale } = useI18n();
const currentLocale = ref(locale.value);

watch(currentLocale, setLocale);
</script>

<style module>
.layout {
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: 1rem;
}

.header {
  box-sizing: border-box;
  display: flex;
  grid-area: header;
  justify-content: flex-end;
  width: 100%;
}
.main {
  align-items: center;
  box-sizing: border-box;
  color: var(--color-background-text);
  display: flex;
  flex-direction: column;
  grid-area: main;
  justify-content: center;
  padding: 1rem;
}

.footer {
  position: sticky;
  bottom: 1rem;
  display: flex;
  grid-area: footer;
  justify-content: flex-end;
}

.localSelect {
  background-color: transparent;
  border: 0;
  color: var(--color-background-text);
  bottom: 1rem;
  left: 1rem;
  position: absolute;
  opacity: 0.5;
  z-index: 100;

  option {
    color: var(--color-background-text);
  }
}
</style>
