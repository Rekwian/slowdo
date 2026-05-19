export const newTask = {
  name: null,
  length: null,
  deadline: null,
  done: false,
  selected: false,
}

function convertToTemporal(date) {
  return date && Temporal.PlainDateTime.from(date);
}

export const deNormalize = (item) => JSON.parse(JSON.stringify({
  ...newTask,
  ...item,
  deadline: item.deadline ?? item.deadline?.toString(),
  selected: item.selected ?? item.selected?.toString(),
  done: item.done ?? item.done?.toString(),
}))


export const normalize = (item) => ({
  ...newTask,
  ...item,
  deadline: convertToTemporal(item.deadline),
  selected: convertToTemporal(item.selected),
  done: convertToTemporal(item.done),
})
