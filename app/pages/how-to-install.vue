<template lang="pug">
nuxt-layout
  article.article
    h1 Comment installer l'application sur mon périphérique

    h2 Pourquoi installer l'application ?
    p
      | Cette application est disponible sous forme de <strong>Progressive Web App (PWA)</strong>. Cela signifie que tu peux l'installer directement depuis ton navigateur, sans passer par une boutique d'applications.
      br
      | Une fois installée, elle se comporte presque comme une application classique :

    ul
      li 🚀 Lancement depuis ton écran d'accueil ou ton menu d'applications.
      li 🖥️ Ouverture dans sa propre fenêtre, sans les éléments du navigateur.
      li ⚡ Démarrage plus rapide.
      li 📶 Fonctionnement hors ligne pour les fonctionnalités qui le permettent.

    h2 Navigateurs compatibles
    p L'installation est actuellement prise en charge sur la plupart des navigateurs basés sur <strong>Chromium</strong>, notamment :
    ul
      li
        nuxt-link(to="https://www.google.com/chrome/" external) Google Chrome
      li
        nuxt-link(to="https://www.microsoft.com/edge/" external) Microsoft Edge
      li
        nuxt-link(to="https://brave.com" external) Brave
      li
        nuxt-link(to="https://www.opera.com" external) Opera
      li
        nuxt-link(to="https://vivaldi.com" external) Vivaldi
      li
        nuxt-link(to="https://arc.net/" external) Arc
    blockquote Certains navigateurs, comme Firefox, ne permettent pas encore l'installation des Progressive Web Apps sur toutes les plateformes.

    h2 Comment installer l'application ?
    p Si ton navigateur est compatible, un bouton d'installation est disponible ci-dessous.
    block-install-pwa
    p tu peux également utiliser le menu de ton navigateur et choisir <strong>"Installer l'application"</strong>, <strong>"Ajouter à l'écran d'accueil"</strong> ou une option équivalente selon ton navigateur.

    h2 Important : tes données
    p L'installation de l'application <strong>ne transfère pas automatiquement les données</strong> déjà présentes dans ton navigateur.
    p Chaque installation possède son propre espace de stockage. Si tu installe l'application sur un nouvel appareil (ou après avoir réinstallé ton navigateur), tes données précédentes ne seront pas récupérées automatiquement.

    h2 Besoin d'aide ?
    p Si le bouton d'installation n'apparaît pas :
    ul
      li vérifie que tu utilise un navigateur compatible ;
      li assure-toi que tu consulte le site en <strong>HTTPS</strong> ;
      li essaye de recharger la page ;
      li vérifie que l'application n'est pas déjà installée.
</template>
