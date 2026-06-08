import { Temporal } from '@js-temporal/polyfill';


export type Task = {
  id?: number | IDBValidKey,
  name: string | null,
  length: string | null,
  deadline: Temporal.PlainDate | null,
  done: Temporal.PlainDateTime | null,
  selected: Temporal.PlainDateTime | null,
}

export const newTask: Task = {
  name: null,
  length: null,
  deadline: null,
  done: null,
  selected: null,
}

/** This function takes a date (or null/false) and converts it to a Temporal.PlainDateTime */
function convertToPlainDatetime(date: Temporal.PlainDateTime | null) {
  return date && Temporal.PlainDateTime.from(date);
}

function convertToPlainDate(date: Temporal.PlainDate | null) {
  return date && Temporal.PlainDate.from(date);
}

/**
 * Denormalizes the task object by creating a deep copy,
 * then serializing and deserializing to remove any Temporal objects.
 */
export const deNormalize = (item: Task) => JSON.parse(JSON.stringify({
  ...newTask,
  ...item,
  deadline: item.deadline && item.deadline.toString(),
  selected: item.selected && item.selected.toString(),
  done: item.done && item.done.toString(),
}))


/**
 * Normalizes the task object by converting string dates to Temporal.PlainDateTime objects.
 */
export const normalize = (item: Task) => ({
  ...newTask,
  ...item,
  deadline: convertToPlainDate(item.deadline),
  selected: convertToPlainDatetime(item.selected),
  done: convertToPlainDatetime(item.done),
})
