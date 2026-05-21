<template lang="pug">
div(:class="{[$style.task]: true, [$style.taskDone]: task.done }")
  div(:class="$style.info")
    div(:class="$style.head")
      button(:class="$style.checkAction" @click="() => toggleTask(task)" :aria-label="$t('page.tasks.markDone')")
        icons-check(v-if="task.done")
      p(:class="$style.taskName") {{ task.name }}
    ul(:class="$style.meta")
      li(v-if="task.length") {{ $t(`page.createTask.step2.${task.length}`) }}
      li(v-if="task.deadline") {{ $d(new Date(task.deadline.toString()), 'short') }}
  div(:class="$style.actions")
    button(:class="$style.removeAction" @click="() => removeTask(task)" :aria-label="$t('page.tasks.remove')")
      icons-trash
</template>

<script setup>
const props = defineProps({
  task: { required: true, type: Object }
})

const { removeTask, updateTask } = useTodo();

function toggleTask(task) {
  updateTask({
    ...task,
    done: task.done ? false : Temporal.Now.plainDateTimeISO(),
  });
}
</script>

<style module>
.task {
  align-items: center;
  border: 1px solid var(--color-surface);
  border-radius: var(--radius-soft);
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
}

.info {
  flex: 1;
}

.taskDone {
  opacity: 0.5;
  .taskName {
    text-decoration: line-through;
  }
}

.head {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.checkAction {
  background-color: var(--background-color);
  border: 2px solid var(--color-surface);
  border-radius: 50%;
  box-sizing: border-box;
  color: var(--color-surface);
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0.5rem;
  height: 30px;
  padding: 0.25rem;
  transition: var(--transition);
  width: 30px;

  &:hover,
  &:focus {
    background: none;
    border-color: var(--color-main);
    box-shadow: none;
    color: var(--color-accent);
  }
}


.taskName {
  font-family: 'quicksand',sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
}

.meta {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin-top: 0.3rem;

  li {
    font-size: 0.9rem;
  }
}

.actions {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.removeAction {
  align-items: center;
  background-color: var(--background-color);
  border: 2px solid var(--color-surface);
  border-radius: 50%;
  box-sizing: border-box;
  color: var(--color-background-text);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  margin-top: 0;
  padding: 0.25rem;
  transition: var(--transition);
  width: 40px;

  &:hover,
  &:focus {
    border-color: hsla(from var(--color-error) h s l / 0.4);
    color: var(--color-error);
  }
}
</style>
