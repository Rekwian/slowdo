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
  padding: 0 1rem;
  position: sticky;
  top: 0;
  width: 100%;

  .brand {
    display: flex;
    font-weight: 500;
  }
}

.main {
  align-items: center;
  box-sizing: border-box;
  color: var(--color-background-text);
  grid-area: main;
  margin: auto;
  max-width: 700px;
  padding: 5rem 1rem;
  text-align: left;
  width: 100%;

  h2 {
    font-size: clamp(1.4rem, 5vw, 2rem);
    margin-bottom: 1rem;
    margin-top: 1rem;
    text-decoration: underline;
  }

  strong {
    font-weight: bold;
  }

  ul {
    color: var(--color-background-text-muted);
    list-style-type: disc;
    padding-left: 2rem;
  }

  blockquote {
    color: var(--color-background-text-muted);
  }

  p {
    color: var(--color-background-text-muted);
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}
</style>
