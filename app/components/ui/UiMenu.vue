<template>
  <ui-modal ref="menuDialog" id="menu-dialog">
    <div :class="$style.wrapper">
      <ul :class="$style.nav">
        <li>
          <nuxt-link :to="$localePath('app')" :class="$style.card">
            <p :class="$style.cardTitle">{{ $t('layout.nav.todayTask') }}</p>
            <p :class="$style.cardDesc">
              Ta tache à faire pour aujourd'hui
            </p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="$localePath('app-task-list')" :class="$style.card">
            <p :class="$style.cardTitle">{{ $t('layout.nav.taskList')}}</p>
            <p :class="$style.cardDesc">
              Ta liste des taches
            </p>
          </nuxt-link>
        </li>
      </ul>
      <ui-select-locale :class="$style.locale" />
    </div>
  </ui-modal>
  <ui-button variant="link" @click="showModal">{{ $t('layout.nav.menu')}}</ui-button>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue';

type ModalType = InstanceType<typeof UiModal>

const menuDialog = useTemplateRef<ModalType>('menuDialog');

function showModal() {
  menuDialog.value?.showModal()
}

onUnmounted(() => {
  menuDialog.value?.closeModal();
})
</script>

<style module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.locale {
  position: fixed;
  bottom: 1rem;
}

.nav {
  color: var(--color-primary-text);
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  text-align: center;
  padding: 1rem;
  a {
    color: var(--color-primary-text);
    text-decoration: none;
  }
}

.card {
  background-color: hsla(0 0% 100% / 0.4);
  border-radius: 1rem;
  display: block;
  padding: 1rem;
  text-align: left;
  height: 100%;

  .cardTitle {
    font-weight: bold;
  }

  .cardDesc {
    font-size: 1rem;
  }
}

@media (min-width: 500px) {
  .nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
