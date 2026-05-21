<template lang="pug">
ui-button(
  :class="$style.addFab"
  :to="$localePath('create-task')"
) {{ $t('page.index.actions.addTask') }}
</template>

<style module>
.addFab {
  bottom: 1rem;
  margin-top: 0;
  position: fixed;
  right: 1rem;
}
</style>
