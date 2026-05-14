<template lang="pug">
form(@submit.prevent="handleSubmit")

  //- Étape 1 : nom
  div(v-show="step === 'name'" class="screen")
    h1 {{ $t('page.createTask.step1.title') }}
    p(:class="$style.hint") {{ $t('page.createTask.step1.subTitle') }}

    input(
      name="name"
      value="test"
      :placeholder="$t('page.createTask.step1.placeholder')"
      autocomplete="off"
    )
    button(@click="step = 'length'" type="button") {{ $t('page.createTask.step1.validationAction') }}

  //- Étape 2 : légère / lourde
  div(v-show="step === 'length'" class="screen")
    h1 {{ $t('page.createTask.step1.title') }}

    div(:class="$style.lengthChoices")
      label(
        v-for="(label, value) in { weak: $t('page.createTask.step2.choice1'), heavy: $t('page.createTask.step2.choice2') }"
        :key="value"
        @click="step = 'deadline'"
        class="button"
      )
        input(type="radio" name="length" :value="value")
        span {{ label }}

  //- Étape 3 : deadline
  div(v-show="step === 'deadline'" class="screen")
    h1 {{ $t('page.createTask.step3.title') }}

    input(
      type="date"
      name="deadline"
      :value="date"
    )
    button(type="submit") {{ $t('page.createTask.step3.validationAction') }}
</template>

<script setup>
const emit = defineEmits(['submit'])

const step = ref('name');

const { addTask } = useTodo();
const router = useRouter();
const localePath = useLocalePath()

const date = Temporal.Now.plainDateISO();

function handleSubmit(value) {
  const formData = new FormData(value.target);
  const date = formData.get('deadline');

  const task = {
    name: formData.get('name'),
    length: formData.get('length'),
    done: false,
  }

  if (date) {
    task.deadline = Temporal.PlainDate.from(date);
  }

  addTask(task);
  router.push(localePath('index'));
}
</script>

<style module>
.hint {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  margin-top: 0.6rem;
}

.lengthChoices {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 3rem;

  /* Remove default button margin since we handle it here */
  :global(.button) {
    margin-top: 0;
  }

  input {
    display: none;
  }
}
</style>
