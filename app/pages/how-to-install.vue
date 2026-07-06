<template lang="pug">
nuxt-layout(name="article")
  h1 {{ $t('page.howToInstall.title') }}

  h2 {{ $t('page.howToInstall.whyInstall.title') }}
  p {{ $t('page.howToInstall.whyInstall.description') }}

  ul
    li {{ $t('page.howToInstall.whyInstall.list.1') }}
    li {{ $t('page.howToInstall.whyInstall.list.2') }}
    li {{ $t('page.howToInstall.whyInstall.list.3') }}
    li {{ $t('page.howToInstall.whyInstall.list.4') }}

  h2 {{ $t('page.howToInstall.compatibleBrowser.title') }}
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

  p {{ $t('page.howToInstall.compatibleBrowser.warning') }}

  h2 {{ $t('page.howToInstall.howTo.title') }}
  p {{ $t('page.howToInstall.howTo.compatibilityCondition') }}
  block-install-pwa
  p {{ $t('page.howToInstall.howTo.alternativeInstall') }}

  h2 {{ $t('page.howToInstall.data.title') }}
  p {{ $t('page.howToInstall.data.description') }}
  p {{ $t('page.howToInstall.data.warning') }}

  h2 {{ $t('page.howToInstall.needHelp.title') }}
  p {{ $t('page.howToInstall.needHelp.conditionnalSituation') }}
  ul
    li {{ $t('page.howToInstall.needHelp.list.1') }}
    li {{ $t('page.howToInstall.needHelp.list.2') }}
    li {{ $t('page.howToInstall.needHelp.list.3') }}
    li {{ $t('page.howToInstall.needHelp.list.4') }}
</template>
