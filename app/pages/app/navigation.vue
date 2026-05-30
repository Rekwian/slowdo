<template lang="pug">
ul
  li <nuxt-link :to="$localePath('app')">Ma tache du jour</nuxt-link>
  li <nuxt-link :to="$localePath('app-task-list')">1. accéder à ma liste des taches</nuxt-link>
  li <nuxt-link :to="$localePath('how-to-install')">2. Comment installer l'application sur mon périphérique</nuxt-link>

</template>
