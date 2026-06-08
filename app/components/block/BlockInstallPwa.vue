<template>
  <div>
    <template v-if="!$pwa?.isPWAInstalled && $pwa?.showInstallPrompt">
      <ui-button @click="() => $pwa?.install()">install</ui-button>
    </template>

    <template v-else>
      <p>Malheureusement, votre navigateur ne permet pas d'installer l'application</p>
    </template>
  </div>
</template>

<style module>
.true {
  color: green;
}

.false {
  color: red;
}
</style>
