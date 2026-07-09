<template lang="pug">
div(:class="$style.mainPage")
  header(:class="$style.header")
    div(:class="$style.brand")
      img(src="/logo.svg" :class="$style.logo" alt="")
      | Slowdo
  slot
</template>

<style module>
.mainPage {
  background: linear-gradient(0deg,var(--color-background) 70%, var(--color-background-gradient) 100%);
  white-space: pre-line;

  h1 {
    font-size: clamp(2.2rem, 5vw, 3.25rem);
    font-weight: 400;
    line-height: 3rem;
    margin: 0 auto 1rem;
    width: 100%;
  }

  h2 {
    font-size: clamp(2rem, 5vw, 2.5rem);
  }

  p {
    color: var(--color-background-text-muted);
  }
}
.header {
  align-items: center;
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
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

@media(min-width: 960px) {
  .mainPage {
    h1 {
      line-height: 4rem;
      margin: 0;
    }
  }
}
</style>
