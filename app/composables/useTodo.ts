import type { Task } from '@/entity/tasks';
import { normalize, deNormalize } from '@/entity/tasks';
import { Temporal } from '@js-temporal/polyfill';

export default () => {
  const idb = useIdb();
  const tasks = useState('todo', (): Task[] => []);

  /** List of not done tasks */
  const nextTasks = computed(function () {
    const { compare } = Temporal.PlainDate;
    const filter = (task: Task) => !task.done || compare(task.done, Temporal.Now.plainDateISO()) !== -1

    return tasks.value.filter(filter)
  })

  /** List of tasks completed today */
  const todayDoneTasks = computed(function () {
    // Filter tasks where done date matches current date (0) and task is not null
    const { compare } = Temporal.PlainDate;
    const filter = (task: Task) => task.done && compare(task.done, Temporal.Now.plainDateISO()) === 0

    return nextTasks.value.filter(filter)
  })

  /** List of old tasks (completed before today) */
  const oldTasks = computed(function () {
    const { compare } = Temporal.PlainDate;
    const filter = (task: Task) => task.done && compare(task.done, Temporal.Now.plainDateISO()) === -1

    return tasks.value.filter(filter)
  })

  /** List of todo tasks. Filter out completed tasks. */
  const toDoTasks = computed(function () {
    return nextTasks.value.filter((task: Task) => !task.done);
  })

  /**
   * Get the current task that is currently being displayed.
   *
   * This function filters the list of tasks to find the one that matches
   * the current date and time. If no such task exists, it returns `null`.
   */
  const currentTask = computed(function (): Task | null {
    function filter(task: Task): task is Task {
      if (task.selected && !task.done) {
        const selected = Temporal.PlainDate.from(task.selected);
        const now = Temporal.Now.plainDateISO().toString();

        return selected.equals(now);
      }

      return false;
    }

    function reduce(previous: Task | null, current: Task) {
      if (!previous) {
        return current;
      }

      return Temporal.PlainDateTime.compare(current.selected!, previous.selected!) > 0 ? current : previous
    }

    return tasks.value.filter(filter).reduce(reduce, null)
  })

  /**
   * Retrieve tasks from IDB and normalize them.
   *
   * This function fetches tasks from the IndexedDB storage, normalizes them,
   * and updates the `tasks` state with the retrieved data.
   */
  async function getTasks() {
    const idbTasks = await idb.getAll();

    tasks.value = idbTasks.map(normalize);
  }

  /**
   * Adds a task to the list of tasks in the application state.
   *
   * This function normalizes the provided task and adds it to both
   * the application state (`tasks`) and the IDB store using `deNormalize`.
   */
  async function addTask(value: Task) {
    tasks.value.push(normalize(value));
    await idb.add(deNormalize(value));
  }

  /**
   * Updates a task in the list of tasks. This involves updating the
   * underlying IndexedDB storage and also updating the state.
   */
  async function updateTask(value: Task) {
    if (!value) {
      return;
    }

    const task: Task = deNormalize(value)
    await idb.update(task);

    const storeTask = tasks.value.find((item: Task) => item.id === task.id)

    if (storeTask) {
      Object.assign(storeTask, task);
    }
  }

  /**
   * Removes a task from the list of tasks.
   */
  async function removeTask(task: Task) {
    if (!task || !task.id) {
      return;
    }

    await idb.remove(task.id);
    const index = tasks.value.findIndex((item: Task) => item.id === task.id);
    tasks.value.splice(index, 1);
  }

  /**
   * Select a random task from the list of tasks.
   *
   * This function filters out completed tasks and selects a random
   * task based on its deadline and length (light or heavy).
   */
  function taskRolling(taskList: Task[]) {
    const deadLineTask = taskList.filter((task: Task) => !task.done && task.deadline);
    const lightTask = taskList.filter((task: Task) => !task.done && task.length === 'light');
    const heavyTask = taskList.filter((task: Task) => !task.done && task.length === 'heavy');

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

  /**
   * Select a task based on the current date and time.
   *
   * This function attempts to select a task that matches the current
   * date and time. If no such task exists, it will select a random
   * task from the list of tasks.
   *
   * when `override` is set to `true`, this function will select a random
   * task even if there is a matching task for the current date and time.
   */
  async function selectTask(override: boolean = false) {
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

  /**
   * Resets the selected tasks for each task in the list of tasks.
   *
   * This function iterates over each task in `nextTasks` and resets
   * its `selected` property to `null`.
   */
  async function resetSelectedTasks() {
    for (const key in nextTasks.value) {
      const task = nextTasks.value[key]

      if (task) {
        task.selected = null;

        await updateTask(task);
      }
    }
  }

  /**
   * Switches to the next task.
   *
   * This function iterates over the list of tasks and finds a task
   * that has not been completed yet. If no such task is found, it resets all selected tasks and then selects a random task.
   */
  async function switchTask() {
    const nowDateTime = Temporal.Now.plainDateTimeISO();

    let notSelectedNextTasks = nextTasks.value.filter((task: Task) => !task.selected && !task.done)

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
    removeTask,
    resetSelectedTasks,
    selectTask,
    switchTask,
    tasks,
    todayDoneTasks,
    toDoTasks,
    updateTask,
  }
}
