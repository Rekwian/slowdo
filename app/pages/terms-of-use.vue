<template lang="pug">
nuxt-layout(name="article")
  ui-glass-sheet
    comark {{ content }}
</template>

<script setup lang="ts">
let content = await useContent('termsOfUse');
</script>
