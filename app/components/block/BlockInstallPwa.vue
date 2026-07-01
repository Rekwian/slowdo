<template lang="pug">
div
  template(v-if="!$pwa?.isPWAInstalled && $pwa?.showInstallPrompt")
    ui-button(@click="() => $pwa?.install()") installer

  template(v-else)
    p(:class="$style.fail")
      | Malheureusement, ton navigateur ne permet pas d'installer l'application. <br/>
      | Essaye avec un autre navigateur.
</template>

<style module>
.fail {
  border: 1px solid var(--color-error);
  border-radius: 1rem;
  color: var(--color-error);
  padding: 1rem;
}
</style>
