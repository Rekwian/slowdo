<template lang="pug">
div(:class="$style.cta")
  ui-button(:to="$localePath('app')") {{ $t('component.BlockCta.try') }}
  ui-button(:to="$localePath('how-to-install')") {{ $t('component.BlockCta.install') }}
</template>

<style module>
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

@media(min-width: 960px) {
  .cta {
    justify-content: flex-start;
  }
}
</style>
