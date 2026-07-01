<template lang="pug">
dialog(
  closedby="any"
  ref="dialog"
  :id="id"
  :open="open"
  :class="$style.dialog"
)
  ui-button(
    :class="$style.closeButton"
    variant="link"
    @click="close"
  ) Fermer

  slot
</template>

<script setup lang="ts">
import type { DialogHTMLAttributes } from 'vue';

defineProps<{
  id?: string,
  open?: DialogHTMLAttributes['open'],
}>()

const dialog = ref<HTMLDialogElement | null>(null);

onMounted(() => {
  // dialog.value?.showModal();
})

function close() {
  dialog.value?.close();
}

defineExpose({
  showModal: () => dialog.value?.showModal(),
  closeModal: () => close(),
})
</script>

<style module>
.dialog {
  background-color: transparent;
  border: 0;
  margin: auto;

  &::backdrop {
    backdrop-filter: blur(8px);
    background-color: rgba(50 50 50 / 0.1);
  }
}

.closeButton {
  position: fixed;
  right: 1rem;
  top: 1rem;
}
</style>
