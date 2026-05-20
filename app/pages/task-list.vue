<template lang="pug">
div(:class="$style.wrapper")
  nuxt-link(:class="[$style.back, 'button']" :to="$localePath('index')") ← {{ $t('page.tasks.back') }}

  //- in Progress
  section(v-if="pendingTasks.length" :class="$style.section")
    h2(:class="$style.title") {{ $t('page.tasks.pending') }}
    ul(:class="$style.list")
      li(v-for="task in pendingTasks" :key="task.id")
        ui-task-card(:task="task")

  //- done
  section(v-if="doneTasks.length" :class="$style.section")
    button(:class="$style.accordionToggle" @click="doneOpen = !doneOpen")
      h2(:class="$style.title") {{ $t('page.tasks.done') }}
      span(:class="[$style.chevron, { [$style.chevronOpen]: doneOpen }]") ›

    Transition(name="slide")
      div(v-if="doneOpen")
        button(:class="$style.clearAll" @click="removeAllDone") {{ $t('page.tasks.clearAll') }}
        ul(:class="$style.list")
          li(v-for="task in doneTasks" :key="task.id")
            ui-task-card(:task="task")

  p(v-if="!tasks.length" :class="$style.empty") {{ $t('page.tasks.empty') }}
  ui-fab-add-task
</template>

<script setup>
const { getTasks, tasks, removeTask } = useTodo();

const doneOpen = ref(false);

const pendingTasks = computed(() => tasks.value.filter((task) => !task.done));
const doneTasks = computed(() => tasks.value.filter((task) => task.done));

function removeAllDone() {
  doneTasks.value.forEach((task) => removeTask(task));
}

onMounted(async () => {
  await getTasks();
})
</script>

<style module>
.wrapper {
  max-width: 600px;
  padding: 4rem 1.5rem;
  width: 100%;
}

.back {
  display: inline-block;
  margin-bottom: 2rem;
  margin-top: 0;
}

.section {
  margin-bottom: 3rem;
}

.title {
  color: var(--color-text-muted);
  font-family: 'quicksand', sans-serif;
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
  text-transform: lowercase;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
}

.accordionToggle {
  align-items: center;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(126 200 184 / 0.1);
  border-radius: 0;
  color: var(--color-background-text-muted);
  cursor: pointer;
  display: flex;
  font-size: 2rem;
  font-style: italic;
  justify-content: space-between;
  letter-spacing: 0.08em;
  margin-top: 0;
  padding: 0.5rem 0;
  text-transform: lowercase;
  width: 100%;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    color: var(--color-accent);
  }
}

.chevron {
  display: inline-block;
  font-style: normal;
  transform: rotate(90deg);
  transition: var(--transition);
}

.chevronOpen {
  transform: rotate(270deg);
}

.clearAll {
  background: none;
  border: none;
  border-radius: 0;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  font-style: italic;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0.25rem 0;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    color: var(--color-error);
  }
}

.empty {
  color: var(--color-background-text-muted);
  font-size: 2rem;
  font-style: italic;
  margin-top: 4rem;
  text-align: center;
}
</style>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
