<template lang="pug">
div(:class="$style.layout")
  header(:class="$style.header")
    div(:class="$style.brand")
      icons-logo

    nav
      ul
        li
          ui-button(variant="link" :to="$localePath('app')") {{ $t('layout.normal.menu.useApp') }}

  main(:class="$style.main")
    slot

  ui-footer
</template>

<style module>
.layout {
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  white-space: pre-line;
}

.header {
  align-items: center;
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  min-height: 4rem;
  position: sticky;
  top: 0;
  width: 100%;

  .brand {
    display: flex;
    font-weight: 500;
  }

  .logo {
    height: 100%;
    margin: auto 1rem auto auto;
    max-width: 3rem;
  }
}

.main {
  align-items: center;
  box-sizing: border-box;
  color: var(--color-background-text);
  grid-area: main;
  margin: auto;
  max-width: 600px;
  padding: 1rem;
  text-align: left;
  width: 100%;
}
</style>
