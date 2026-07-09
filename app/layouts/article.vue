<template lang="pug">
div(:class="$style.layout")
  header(:class="$style.header")
    div(:class="$style.brand")
      img(src="/logo.svg" :class="$style.logo" alt="")
      | Slowdo

    nav
      ul
        li
          ui-button(variant="link" :to="$localePath('app')") Utiliser Slowdo

  main(:class="$style.main")
    slot
</template>

<style module>
.layout {
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: 0 1rem 1rem;
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
  max-width: 700px;
  padding: 1rem;
  text-align: left;

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
