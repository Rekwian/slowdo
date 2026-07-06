<template lang="pug">
client-only
  template(v-if="!$pwa?.isPWAInstalled && $pwa?.showInstallPrompt")
    ui-button(@click="() => $pwa?.install()") {{ $t('component.BlockInstallPWA.install') }}

  template(v-else)
    p(:class="$style.fail") {{ $t('component.BlockInstallPWA.error') }}
</template>

<style module>
.fail {
  border: 1px solid var(--color-error);
  border-radius: 1rem;
  color: var(--color-error) !important;
  padding: 1rem;
}
</style>
