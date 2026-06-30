<template lang="pug">
nuxt-layout
  form(@submit.prevent="handleSubmit" @keydown.enter.prevent="handleEnter")
    ui-button(:class="[$style.back, 'button']" :to="$localePath('app')" variant="link") ← {{ $t('page.tasks.back') }}

    fieldset(v-show="step === 'name'")
      ui-wrapper(:title="$t('page.createTask.step1.title')" :subtitle="$t('page.createTask.step1.subTitle')")
        input(autocomplete="off" name="name" :placeholder="$t('page.createTask.step1.placeholder')" v-model="r$.$value.name")
        ui-field-error(:errors="r$.name.$errors")

        template(#actions)
          ui-button(@click="!r$.$invalid && goToStep('length')" type="button" :disabled="r$.$invalid") {{ $t('page.createTask.step1.validationAction') }}

    fieldset(v-show="step === 'length'")
      ui-wrapper(:title="$t('page.createTask.step2.title')")
        div(:class="$style.lengthChoices")
          label(v-for="(label, length) in lengths" :key="length")
            input(type="radio" name="length" :value="length" v-model="lengthChoice" required)

            ui-button(@click="lengthChoice = length; goToStep('deadline')" type="button") {{ label }}

    fieldset(v-show="step === 'deadline'")
      ui-wrapper(:title="$t('page.createTask.step3.title')")
        div(:class="$style.dateWrapper" style="display: flex; flex-direction: column;")
          ui-date-picker(v-model="deadline")

        template(#actions)
          ui-button(type="submit") {{ deadline ? $t('page.createTask.step3.validationAction') : $t('page.createTask.step3.validationActionNoDate') }}
</template>

<script setup lang="ts">
import { newTask } from '@/entity/tasks';
import { Temporal } from '@js-temporal/polyfill';
import { useRegle } from '#imports';
import { required } from '@regle/rules';

const emit = defineEmits(['submit']);
const { t } = useI18n();

const lengths = {
  light: t('page.createTask.step2.light'),
  heavy: t('page.createTask.step2.heavy'),
}

const steps = ['name', 'length', 'deadline'];
const step = ref('name');

// Form values
const deadline: Ref<Temporal.PlainDate | null> = ref(null);
const lengthChoice: Ref<string | null> = ref(null);

const { addTask } = useTodo();
const router = useRouter();
const route = useRoute()
const localePath = useLocalePath();
const { r$ } = useRegle(
  { name: '' },
  {
    name: { required },
  }
);

function handleSubmit() {
  const task = {
    ...newTask,
    name: r$.$value.name,
    deadline: deadline.value,
    length: lengthChoice.value,
  }


  if (deadline.value) {
    task.deadline = Temporal.PlainDate.from(deadline.value);
  }

  addTask(task);
  router.push(localePath('app'));
}

function handleEnter() {
  const currentIndex = steps.indexOf(step.value);
  console.group(steps[currentIndex]);
  if (currentIndex < steps.length - 1) {
    console.log(steps[currentIndex + 1]);
    goToStep(steps[currentIndex + 1])
  }

  if (currentIndex === steps.length - 1) {
    console.log('handleEnter');
    handleSubmit();
  }
  console.groupEnd();
}

function goToStep(newStep?: string) {
  if (newStep && steps.includes(newStep)) {
    router.push({ query: { step: newStep } })
  }
}

onMounted(() => {
  router.replace({ query: { step: 'name' }})
})

watch(
  () => route.query.step,
  (newStep) => {
    const stepValue = Array.isArray(newStep) ? newStep[0] : newStep

    if (stepValue && steps.includes(stepValue)) {
      step.value = stepValue
    }
  }
)
</script>

<style module>
.lengthChoices {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
  margin-top: 3rem;

  input {
    display: none;
  }
}

.dateWrapper {
  align-items: center;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  max-width: 580px;
  width: 100%;
}

.clearBtn {
  background: none;
  border: none;
  color: var(--color-background-text-muted);
  cursor: pointer;
  font-size: 1.4rem;
  font-style: normal;
  line-height: 1;
  margin-top: 0;
  padding: 0.25rem 0.5rem;
  transition: var(--transition);

  &:hover,
  &:focus {
    background: none;
    box-shadow: none;
    color: var(--color-primary-hover);
  }
}
</style>
