<template lang="pug">
div
  pre pwa:
    span(:class="!!$pwa ? $style.true : $style.false") {{ ' ' + !!$pwa }} <br />
    span isPWAInstalled:
    span(:class="!!$pwa.isPWAInstalled ? $style.true : $style.false") {{ ' ' + !!$pwa.isPWAInstalled }} <br />
    span showInstallPrompt:
    span(:class="!!$pwa.showInstallPrompt ? $style.true : $style.false") {{ ' ' + !!$pwa.showInstallPrompt }} <br />
    span offlineReady:
    span(:class="!!$pwa.offlineReady ? $style.true : $style.false") {{ ' ' + !!$pwa.offlineReady }} <br />
    span needRefresh:
    span(:class="!!$pwa.needRefresh ? $style.true : $style.false") {{ ' ' + !!$pwa.needRefresh }} <br />
    span swActivated:
    span(:class="!!$pwa.swActivated ? $style.true : $style.false") {{ ' ' + !!$pwa.swActivated }} <br />
  template(v-if="!$pwa?.isPWAInstalled && $pwa?.showInstallPrompt")
    ui-button(@click="$pwa?.install()") install
  template(v-else)
    p Malheureusement, votre navigateur ne permet pas d'installer l'application
</template>

<style module>
.true {
  color: green;
}

.false {
  color: red;
}
</style>
