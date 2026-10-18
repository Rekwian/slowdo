<template lang="pug">
select(
  v-model="model"
  class="input"
  autocomplete="off"
  v-bind="$attrs"
)
  option(
    v-for="(option, key) in options"
    :key="key"
    :value="option.value"
    :class="$style.option"
    v-bind="option.attrs"
  ) {{ option.name }}
</template>

<script setup lang="ts">
import type { OptionHTMLAttributes } from 'vue';

interface Options {
  name: string,
  value: string | null,
  attrs?: OptionHTMLAttributes
}

defineProps<{
  options?: Array<Options>
}>()

const model = defineModel();
</script>

<style module>
.option {
  font-size: 1rem;
}
</style>
