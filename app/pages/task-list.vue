<template lang="pug">
div(:class="$style.wrapper")
  ul(v-for="category in categories")
    template(v-if="category.tasks.length")
      h2(:class="$style.title") {{ category.title }}
      li(v-for="task in category.tasks" :key="task.id" :class="$style.task")
        div(:class="$style.info")
          p(:class="$style.taskName") {{ task.name }}
          ul(:class="$style.meta")
            li(v-if="task.length") {{ $t(`page.createTask.step2.${task.length}`) }}
            li(v-if="task.deadline") {{ $d(new Date(task.deadline.toString()), 'short') }}
        div(:class="$style.actions")
          button
            icons-trash
</template>

<script setup>
const { getTasks, tasks } = useTodo();

const categories = computed(() => ([
  {
    title: 'Tache en cours',
    tasks: tasks.value.filter((task) => !task.done)
  },
  {
    title: 'Tache Terminées',
    tasks: tasks.value.filter((task) => task.done)
  },
]))

onMounted(async () => {
  await getTasks();
})
</script>

<style module>
.title {
  font-size: 2rem;
}
.taskName {
  font-size: 1.2rem;
  font-weight: 600;
}
.wrapper {
  max-width: 600px;
  width: 100%;
}
.meta {
  display: flex;
  font-size: .9rem;
  gap: 1rem;
}
.task {
  border: 1px solid var(--color-surface);
  border-radius: var(--radius-soft);
  display: flex;
  gap: 2rem;
  padding: 1rem;
}
.info {
  flex: 1;
}
.actions {
  display: flex;
  button {
    align-self: center;
    background-color: transparent;
    border: 1px solid var(--color-surface);
    border-radius: var(--radius-soft);
    box-sizing: border-box;
    color: var(--color-error);
    height: 40px;
    padding: 0.25rem;
    width: 40px;
  }
}
</style>
