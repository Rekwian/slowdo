<template lang="pug">
footer(:class="$style.footer")
  nav
    ul(:class="$style.navList")
      li
        nuxt-link(:to="$localePath('contact')") {{ $t('component.UiFooter.links.contact') }}
      li
        nuxt-link(:to="$localePath('terms-of-use')") {{ $t('component.UiFooter.links.termsOfUse') }}
      li
        nuxt-link(:to="$localePath('legal-notice')") {{ $t('component.UiFooter.links.legalNotice') }}
      li
        nuxt-link(:to="$localePath('privacy-policy')") {{ $t('component.UiFooter.links.privacyPolicy') }}
</template>

<style module>
.footer {
  background-color: hsl(from var(--color-background) h s 8%);
  border-top: 1px solid var(--color-primary);
  padding: 1rem;

  a {
    color: var(--color-background-text-grey);
    text-decoration: none;

    &:hover {
      color: var(--color-background-text);
    }
  }
}
.navList {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
