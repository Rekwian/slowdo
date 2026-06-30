<template lang="pug">
ui-modal(ref="menuDialog" id="menu-dialog")
  p(:class="$style.title") Menu
  div(:class="$style.wrapper")
    ul(:class="$style.nav")
      li
        nuxt-link(:to="$localePath('app')" :class="$style.card" @click="closeModal()")
          p(:class="$style.cardTitle") {{ $t('layout.nav.todayTask') }}
      li
        nuxt-link(:to="$localePath('app-task-list')" :class="$style.card")
          p(:class="$style.cardTitle") {{ $t('layout.nav.taskList')}}

      li
        nuxt-link(:to="$localePath('how-to-install')" :class="$style.card")
          p(:class="$style.cardTitle") {{ $t('layout.nav.howToInstall')}}

    ui-select-locale(:class="$style.locale")

ui-button(variant="link" @click="showModal") {{ $t('layout.nav.menu')}}
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue';

type ModalType = InstanceType<typeof UiModal>

const menuDialog = useTemplateRef<ModalType>('menuDialog');

function showModal() {
  menuDialog.value?.showModal()
}

function closeModal() {
  menuDialog.value?.closeModal()
}

onUnmounted(() => {
  closeModal();
})
</script>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.title {
  text-align: center;
  color: var(--color-background-text);
  margin-bottom: 1.5rem;
}

.locale {
  background-color: light-dark(var(--color-background), black);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 1rem;
}

.nav {
  align-items: center;
  color: var(--color-primary-text);
  display: flex;
  flex-direction: column;;
  gap: 1em;
  text-align: center;
  padding: 1rem;

  a {
    color: var(--color-primary-text);
    text-decoration: none;
  }
}

.card {
  background-color: hsla(0 0% 100% / 0.4);
  border-radius: 2rem;
  display: block;
  padding: 1rem;
  text-align: center;
  height: 100%;

  .cardTitle {
    font-weight: 400;
  }

  .cardDesc {
    font-size: 1rem;
  }

  &:global(.router-link-active) {
    display: none;
  }

  &:hover {
    background-color: hsla(0 0% 100% / 0.7);
  }
}
</style>
