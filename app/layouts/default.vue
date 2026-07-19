<template lang="pug">
slot
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  ogTitle: 'Slowdo - Une seule tâche à la fois',
  ogDescription: 'Réduis ta charge mentale avec une application simple qui met une seule tâche en avant chaque jour.',
  ogImage: `${config.public.baseUrl}/logo.svg`,
  ogUrl: config.public.baseUrl,
  twitterCard: 'summary_large_image',
})
</script>
