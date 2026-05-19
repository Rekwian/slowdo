<template lang="pug">
form(@submit.prevent="handleSubmit" @keydown.enter.prevent="handleEnter")
  //- Step 1: Name
  fieldset(v-show="step === 'name'")
    ui-wrapper(
      :title="$t('page.createTask.step1.title')"
      :subtitle="$t('page.createTask.step1.subTitle')"
    )
      input(
        autocomplete="off"
        name="name"
        :placeholder="$t('page.createTask.step1.placeholder')"
        v-model="name"
      )
      template(#actions)
        ui-button(@click="goToStep('length')" type="button") {{ $t('page.createTask.step1.validationAction') }}

  //- Step 2: Weak / Heavy
  fieldset(v-show="step === 'length'")
    ui-wrapper(:title="$t('page.createTask.step2.title')")
      div(:class="$style.lengthChoices")
        label(
          v-for="(label, length) in { weak: $t('page.createTask.step2.choice1'), heavy: $t('page.createTask.step2.choice2') }"
          :key="length"
        )
          input(type="radio" name="length" :value="length" v-model="lengthChoice")
          ui-button(@click="lengthChoice = length; goToStep('deadline')" type="button") {{ label }}

  //- Step 3: Deadline
  fieldset(v-show="step === 'deadline'")
    ui-wrapper(:title="$t('page.createTask.step3.title')")
      div(:class="$style.dateWrapper")
        input(
          type="date"
          name="deadline"
          v-model="deadline"
        )
        ui-button(
          v-if="deadline"
          type="button"
          :class="$style.clearBtn"
          @click="clearDeadline"
        ) ×

      template(#actions)
        ui-button(type="submit") {{ deadline ? $t('page.createTask.step3.validationAction') : $t('page.createTask.step3.validationActionNoDate') }}
</template>

<script setup>
const emit = defineEmits(['submit']);

const steps = ['name', 'length', 'deadline'];
const step = ref('name');

// Form values
const name = ref(null);
const deadline = ref(null);
const lengthChoice = ref(null);

const { addTask } = useTodo();
const router = useRouter();
const route = useRoute()
const localePath = useLocalePath();

function clearDeadline() {
  deadline.value = '';
}

function handleSubmit() {
  const task = {
    name: name.value,
    length: lengthChoice.value,
    done: false,
  }

  if (deadline.value) {
    task.deadline = Temporal.PlainDate.from(deadline.value);
  }

  addTask(task);
  router.push(localePath('index'));
}

function handleEnter(v) {
  const currentIndex = steps.indexOf(step.value);
  if (currentIndex < steps.length - 1) {
    goToStep(steps[currentIndex + 1])
  }

  if (currentIndex === steps.length - 1) {
    handleSubmit();
  }
}

function goToStep(newStep) {
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
    if (newStep && steps.includes(newStep)) {
      step.value = newStep
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
    color: var(--color-main-hover);
  }
}
</style>
