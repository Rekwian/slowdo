<template lang="pug">
div(v-if="!currentTask && !toDoTasks?.length" class="screen")
  h1 {{ noTaskText.title }}
  p(:class="$style.subtitle") {{ noTaskText.text }}

div(v-if="!currentTask && toDoTasks?.length" class="screen")
  h1 {{ noTaskText.title }}
  p(:class="$style.subtitle") {{ noTaskText.text }}
  button(v-if="toDoTasks.length" @click="selectTask(true)") {{ $t('page.index.actions.canDoAnotherTask') }}

div(v-if="currentTask" class="screen")
  h1 {{ $t('page.index.normalTask.title') }}
  p(:class="$style.subtitle") {{ $t('page.index.normalTask.text') }}

  label(:class="$style.taskCheckbox")
    input(type="checkbox" @change="checkTask")
    div(:class="$style.checkboxInput")
      svg(v-if="false" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(d="M1 5l3.5 3.5L11 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
    span(:class="$style.taskName") {{ currentTask.name }}

nuxt-link(
  :class="[$style.addFab, 'button']"
  :to="$localePath('create-task')"
) {{ $t('page.index.actions.addTask') }}
</template>

<script setup>
const { t } = useI18n();
const {
  currentTask,
  getTasks,
  selectTask,
  todayDoneTasks,
  toDoTasks,
  updateTask,
} = useTodo();

function checkTask() {
  updateTask({
    ...currentTask.value,
    done: Temporal.Now.plainDateTimeISO()
  });
}

const noTaskText = computed(() => {
  if (todayDoneTasks?.value.length > 0) {
    return {
      title: t('page.index.noTaskWithDone.title'),
      text: t('page.index.noTaskWithDone.text'),
    }
  }
  return {
    title: t('page.index.noTaskWithoutDone.title'),
    text: t('page.index.noTaskWithoutDone.text'),
  }
})

onMounted(async () => {
  await getTasks();

  selectTask();
})
</script>

<style module>
.subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
  letter-spacing: 0.06em;
  margin-top: 0.75rem;
  text-transform: lowercase;
}

.addFab {
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  margin-top: 0;
}

.taskCheckbox {
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 1.25rem;
  margin-top: 3rem;

  input {
    display: none;
  }

  /* When checked, tint the box */
  input:checked + .checkboxInput {
    background-color: var(--color-accent-glow);
    border-color: var(--color-accent);
  }
}

.checkboxInput {
  border: 1.5px solid var(--color-border);
  border-radius: 0.6rem;
  background-color: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  transition: background-color var(--transition), border-color var(--transition);

  &:hover {
    border-color: var(--color-accent);
  }
}

.taskName {
  font-family: 'Lora', serif;
  font-size: 1.3rem;
  font-style: italic;

  &::first-letter {
    font-size: 1.2em;
    text-transform: uppercase;
  }
}
</style>
