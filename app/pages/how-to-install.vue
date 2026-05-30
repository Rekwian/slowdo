<template lang="pug">
nuxt-layout
  content-renderer(:value="post")
</template>

<script setup>
const { data: post } = await useAsyncData(
  `tutorial-how-to-install`,
  async () => queryCollection("tutorial").path(`/tutorial/how-to-install`).first(),
);
</script>
