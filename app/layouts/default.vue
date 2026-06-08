<template>
  <div :class="$style.layout">
    <header :class="$style.header">
      <ui-modal ref="menuDialog" id="menu-dialog">
        <ul :class="$style.nav">
          <li>
            <ui-button variant="link" @click="":to="$localePath('app')">
              {{ $t('layout.nav.todayTask') }}
            </ui-button>
          </li>
          <li>
            <ui-button variant="link" @click="":to="$localePath('app-task-list')">
              {{ $t('layout.nav.taskList')}}
            </ui-button>
          </li>
          <li>
            <ui-button variant="link" :to="$localePath('how-to-install')">{{ $t('layout.nav.howToInstall')}}
            </ui-button>
          </li>
        </ul>
      </ui-modal>
      <ui-button variant="link" @click="showModal">{{ $t('layout.nav.menu')}}</ui-button>
    </header>
    <main :class="$style.main">
      <slot></slot>
    </main>
    <footer :class="$style.footer">
      <slot name="actions"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue';

type ModalType = InstanceType<typeof UiModal>

const { setLocale, locale } = useI18n();
const currentLocale = ref(locale.value);


const menuDialog = useTemplateRef<ModalType>('menuDialog');

function showModal() {
  menuDialog.value?.showModal()
}

watch(currentLocale, setLocale);

onUnmounted(() => {
  menuDialog.value?.closeModal();
})
</script>

<style module>
.layout {
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: 1rem;
}

.header {
  box-sizing: border-box;
  display: flex;
  grid-area: header;
  justify-content: flex-end;
  width: 100%;
}
.main {
  align-items: center;
  box-sizing: border-box;
  color: var(--color-background-text);
  display: flex;
  flex-direction: column;
  grid-area: main;
  justify-content: center;
  padding: 1rem;
}

.footer {
  position: sticky;
  bottom: 1rem;
  display: flex;
  grid-area: footer;
  justify-content: flex-end;
}

.localSelect {
  background-color: transparent;
  border: 0;
  color: var(--color-background-text);
  bottom: 1rem;
  left: 1rem;
  position: absolute;
  opacity: 0.5;
  z-index: 100;

  option {
    color: var(--color-background-text);
  }
}

.nav {
  background-color: hsla(0 0% 100% / 0.4);
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  a {
    color: var(--color-primary-text);
    text-decoration: none;
  }
}
</style>
