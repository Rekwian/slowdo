<template lang="pug">
slot
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const { t } = useI18n();

useSeoMeta({
  ogTitle: `${t('nuxtSiteConfig.name')}`,
  ogDescription: `${t('nuxtSiteConfig.description')}`,
  ogImage: `${config.public.baseUrl}/logo.svg`,
  ogUrl: config.public.baseUrl,
  twitterCard: 'summary_large_image',
})
</script>
