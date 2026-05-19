import { normalize, deNormalize } from '@/entity/tasks';

export default () => {
  const idb = useIdb();
  const tasks = useState('todo', () => []);

  const nextTasks = computed(() => tasks.value.filter((task) => !task.done || Temporal.PlainDate.compare(task.done, Temporal.Now.plainDateISO()) !== -1));
  const toDoTasks = computed(() => nextTasks.value.filter((task) => !task.done));
  const oldTasks = computed(() => tasks.value.filter((task) => task.done && Temporal.PlainDate.compare(task.done, Temporal.Now.plainDateISO()) === -1));
  const todayDoneTasks = computed(() => nextTasks.value.filter((task) => task.done && Temporal.PlainDate.compare(task.done, Temporal.Now.plainDateISO()) === 0))

  const currentTask = computed(() => tasks.value.filter((task) => {
    if (task.selected && !task.done) {
      const selected = Temporal.PlainDate.from(task.selected);
      const now = Temporal.Now.plainDateISO().toString();

      return selected.equals(now);
    }

    return false;
  }).reduce((previous, current) => {
    if (!previous) {
      return current;
    }

    return Temporal.PlainDateTime.compare(current.selected, previous.selected) > 0 ? current : previous
  }, null));

  async function getTasks() {
    const idbTasks = await idb.getAll();

    tasks.value = idbTasks.map(normalize);
  }

  async function addTask(value) {
    tasks.value.push(normalize(value));
    await idb.add(deNormalize(value));
  }

  async function updateTask(value) {
    if (!value) {
      return;
    }

    const task = deNormalize(value)
    await idb.update(task);

    const storeTask = tasks.value.find((item) => item.id === task.id)
    Object.assign(storeTask, task);
  }

  function taskRolling(taskList) {
    const deadLineTask = taskList.filter((task) => !task.done && task.deadline);
    const lightTask = taskList.filter((task) => !task.done && task.length === 'light');
    const heavyTask = taskList.filter((task) => !task.done && task.length === 'heavy');

    if (deadLineTask.length) {
      return deadLineTask[Math.floor(Math.random() * deadLineTask.length)];
    }

    if (lightTask.length) {
      return lightTask[Math.floor(Math.random() * lightTask.length)];
    }

    if (heavyTask.length) {
      return heavyTask[Math.floor(Math.random() * heavyTask.length)];
    }
  }

  async function selectTask(override = false) {
    if (todayDoneTasks.value.length && !override) {
      return;
    }
    
    const now = Temporal.Now.plainDateTimeISO();
    
    if (!currentTask.value) {
      const task = taskRolling(nextTasks.value);

      if (task) {
        task.selected = now;
        await updateTask(task);
      }
    }
  }
  
  async function resetSelectedTasks() {
    for (const key in nextTasks.value) {
      const task = nextTasks.value[key]
      task.selected = null;

      await updateTask(task);
    }
  }

  async function switchTask() {
    const nowDateTime = Temporal.Now.plainDateTimeISO();

    let notSelectedNextTasks = nextTasks.value.filter((task) => !task.selected && !task.done)

    if (!notSelectedNextTasks.length) {
      await resetSelectedTasks()

      return selectTask();
    }

    const nextTask = taskRolling(notSelectedNextTasks);
    if (nextTask) {
      nextTask.selected = nowDateTime;
      await updateTask(nextTask);
    }
  }

  return {
    addTask,
    currentTask,
    getTasks,
    nextTasks,
    oldTasks,
    resetSelectedTasks,
    selectTask,
    switchTask,
    tasks,
    todayDoneTasks,
    toDoTasks,
    updateTask,
  }
}
