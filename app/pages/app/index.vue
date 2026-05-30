<template lang="pug">
nuxt-layout
  template(v-if="!currentTask && !toDoTasks?.length")
    ui-wrapper(
      :title="noTaskText.title"
      :subtitle="noTaskText.text"
    )

  template(v-if="!currentTask && toDoTasks?.length")
    ui-wrapper(
      :title="noTaskText.title"
      :subtitle="noTaskText.text"
    )
      ui-button(variant="flat" v-if="toDoTasks.length" @click="() => selectTask(true)") {{ $t('page.index.actions.canDoAnotherTask') }}

  template(v-if="currentTask")
    ui-wrapper(
      :title="$t('page.index.normalTask.title')"
      :subtitle="$t('page.index.normalTask.text')"
    )
      p(:class="$style.taskName") {{ currentTask.name }}
      template(#actions)
        div(:class="$style.actions")
          ui-button(@click="checkTask") {{ $t('page.index.normalTask.done') }}
          ui-button(variant="flat" @click="switchTask") {{ $t('page.index.normalTask.reroll') }}

  //- ui-fab-add-task



  template(#actions)
    ui-button(:to="$localePath('app-create-task')") {{ $t('page.index.actions.addTask') }}
//- nav(:class="$style.cornerNav")
//-   ui-button(variant="flat" :class="$style.ghostLink" :to="$localePath('task-list')") {{ $t('page.index.actions.taskList') }}
//-   ui-button(variant="flat" v-if="false" :class="$style.ghostLink" :to="$localePath('login')") {{ $t('page.index.actions.login') }}
</template>

<script setup>
import { Temporal } from '@js-temporal/polyfill';

const { t } = useI18n();
const {
  currentTask,
  getTasks,
  resetSelectedTasks,
  selectTask,
  switchTask,
  todayDoneTasks,
  toDoTasks,
  updateTask,
} = useTodo();

async function checkTask() {
  await updateTask({
    ...currentTask.value,
    done: Temporal.Now.plainDateTimeISO()
  });
  await resetSelectedTasks();
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
  await selectTask();
})
</script>

<style module>
.cornerNav {
  align-items: center;
  display: flex;
  gap: 1.25rem;
  position: fixed;
  right: 1.25rem;
  top: 1.25rem;
}

.taskCheckbox {
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 1.25rem;

  input {
    display: none;
  }
}

.taskName {
  font-family: 'Nunito', sans-serif;
  font-size: 1.3rem;
  font-style: italic;

  &::first-letter {
    font-size: 1.2em;
    text-transform: uppercase;
  }
}

.actions {
  align-items: center;
  color: var(--color-background-text-muted);
  display: flex;
  flex-direction: column;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-style: italic;
  gap: 2rem;
  letter-spacing: 0.03em;
  min-height: 44px; /* touch target minimum recommandé */
  text-decoration: none;
  transition: color var(--transition);
}
</style>
