<template lang="pug">
ui-button(
  :class="$style.addFab"
  :to="$localePath('create-task')"
) {{ $t('page.index.actions.addTask') }}
</template>

<style module>
.addFab {
  bottom: 2.5rem;
  margin-top: 0;
  position: fixed;
  right: 2.5rem;
}
</style>
