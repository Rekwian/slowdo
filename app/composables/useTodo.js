import { normalize, deNormalize } from '@/entity/tasks'

export default () => {
  const idb = useIdb();
  const tasks = useState('todo', () => [])

  const toDoTasks = computed(() => tasks.value.filter((task) => !task.done));
  const todayDoneTasks = computed(
    () => tasks.value.filter((task) => task.done && Temporal.PlainDate.compare(task.done, Temporal.Now.plainDateISO()) === 0)
  )

  const currentTask = computed(() => tasks.value.find(task => {
    if (task.selected && !task.done) {
      return task.selected.equals(Temporal.Now.plainDateISO().toString());
    }

    return false;
  }))

  async function getTasks() {
    const idbTasks = await idb.getAll();
    tasks.value = idbTasks.map((item) => {
      return normalize(item)
    });
  }

  function addTask(value) {
    tasks.value.push(normalize(value));
    idb.add(deNormalize(value));
  }

  async function updateTask(value) {
    const task = deNormalize(value)
    await idb.update(task);

    const storeTask = tasks.value.find((item) => item.id === task.id)
    Object.assign(storeTask, task);
  }

  function selectTask(override = false) {
    if (todayDoneTasks.value.length && !override) {
      return;
    }

    const now = Temporal.Now.plainDateISO();

    if (!currentTask.value) {
      
      const deadLineTask = toDoTasks.value.filter((task) => task.deadline);
      const weakTask = toDoTasks.value.filter((task) => task.length === 'weak');
      const heavyTask = toDoTasks.value.filter((task) => task.length === 'heavy');

      if (deadLineTask.length) {
        const task = deadLineTask[Math.floor(Math.random() * deadLineTask.length)];
        task.selected = now;
      } else if (weakTask.length) {
        const task = weakTask[Math.floor(Math.random() * weakTask.length)];
        task.selected = now;
      } else if (heavyTask.length) {
        const task = heavyTask[Math.floor(Math.random() * heavyTask.length)];
        task.selected = now;
      }
    }
  }

  return {
    addTask,
    currentTask,
    getTasks,
    toDoTasks,
    selectTask,
    tasks,
    todayDoneTasks,
    updateTask,
  }
}
