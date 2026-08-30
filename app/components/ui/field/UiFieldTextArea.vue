<template lang="pug">
textarea(v-model="model" class="input")
</template>

<script setup lang="ts">
const model = defineModel<string|null>();
</script>
