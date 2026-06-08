<template>
  <nuxt-layout>
    <form @submit.prevent="handleSubmit" @keydown.enter.prevent="handleEnter">
      <ui-button :class="[$style.back, 'button']" :to="$localePath('app')" variant="link">← {{ $t('page.tasks.back') }}</ui-button>

      <fieldset v-show="step === 'name'">
        <ui-wrapper :title="$t('page.createTask.step1.title')" :subtitle="$t('page.createTask.step1.subTitle')">
          <input autocomplete="off" name="name" :placeholder="$t('page.createTask.step1.placeholder')" v-model="name"/>

          <template #actions>
            <ui-button @click="name && goToStep('length')" type="button" :disabled="!name">
              {{ $t('page.createTask.step1.validationAction') }}
            </ui-button>
          </template>
        </ui-wrapper>
      </fieldset>

      <fieldset v-show="step === 'length'">
        <ui-wrapper :title="$t('page.createTask.step2.title')">
          <div :class="$style.lengthChoices">
            <label v-for="(label, length) in lengths" :key="length">
              <input type="radio" name="length" :value="length" v-model="lengthChoice"/>

              <ui-button @click="lengthChoice = length; goToStep('deadline')" type="button">
                {{ label }}
              </ui-button>
            </label>
          </div>
        </ui-wrapper>
      </fieldset>

      <fieldset v-show="step === 'deadline'">
        <ui-wrapper :title="$t('page.createTask.step3.title')">
          <div :class="$style.dateWrapper">
            <input type="date" name="deadline" v-model="deadline" placeholder="DD/MM/YYYY"/>

            <ui-button v-if="deadline" type="button" :class="$style.clearBtn" @click="clearDeadline">
              ×
            </ui-button>
          </div>

          <template #actions>
            <ui-button type="submit">
              {{ deadline ? $t('page.createTask.step3.validationAction') : $t('page.createTask.step3.validationActionNoDate') }}
            </ui-button>
          </template>
        </ui-wrapper>
      </fieldset>
    </form>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { newTask } from '@/entity/tasks';
import { Temporal } from '@js-temporal/polyfill';

const emit = defineEmits(['submit']);
const { t } = useI18n();

const lengths = {
  light: t('page.createTask.step2.light'),
  heavy: t('page.createTask.step2.heavy'),
}

const steps = ['name', 'length', 'deadline'];
const step = ref('name');

// Form values
const name: Ref<string | null> = ref(null);
const deadline: Ref<Temporal.PlainDate | null> = ref(null);
const lengthChoice: Ref<string | null> = ref(null);

const { addTask } = useTodo();
const router = useRouter();
const route = useRoute()
const localePath = useLocalePath();

function clearDeadline() {
  deadline.value = null;
}

function handleSubmit() {
  const task = {
    ...newTask,
    name: name.value,
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
