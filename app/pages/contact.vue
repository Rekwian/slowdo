<!--
  Prévoir BotID
  https://vercel.com/docs/botid/get-started?framework=nuxt
-->
<template lang="pug">
nuxt-layout(name="normal")
  ui-glass-sheet(
    tag="form"
    :class="$style.form"
    @submit.prevent="handleSubmit"
  )
    h1 {{ t('page.contact.title') }}
    label
      | {{ t('page.contact.form.email.label') }}
      ui-field-email(v-model="r$.$value.email")
      ui-field-error(:errors="r$.email.$errors" hide-details)
    label
      | {{ t('page.contact.form.pattern.label') }}
      ui-field-select(v-model="r$.$value.pattern" :options="patternOptions")
      ui-field-error(:errors="r$.pattern.$errors" hide-details)

    label
      | {{ t('page.contact.form.message.label') }}
      ui-field-text-area(v-model="r$.$value.message")
      ui-field-error(:errors="r$.message.$errors" hide-details)

    ui-button(
      type="submit"
      :disabled="r$.$invalid"
      :class="$style.submitAction"
    ) envoyer
</template>

<script setup lang="ts">
import { required } from '@regle/rules';

const { t } = useI18n();

const { r$ } = useRegle(
  {
    email: '',
    pattern: '',
    message: '',
  },
  {
    email: { required },
    pattern: { required },
    message: { required },
  }
);

const options = [
  'page.contact.form.pattern.options.question',
  'page.contact.form.pattern.options.bug',
  'page.contact.form.pattern.options.suggest',
  'page.contact.form.pattern.options.rgpd',
  'page.contact.form.pattern.options.security',
  'page.contact.form.pattern.options.other',
]

const patternOptions = [
  { name: '', value: null, attrs: { hidden: true }},
  ...options.map((value) => ({ name: t(value), value }))
]

async function handleSubmit() {
  const { valid } = await r$.$validate();

  if (!valid) {
    return;
  }

  const result = await $fetch('/api/contact', {
    method: 'POST',
    body: {
      email: r$.$value.email,
      message: r$.$value.message,
      pattern: r$.$value.pattern,
    }
  })

  console.log(result);
}
</script>

<style module>
.form {
  display: grid;
  gap: 1rem;
}

.form textarea {
  height: 200px;
}

.submitAction {
  justify-self: end;
}
</style>
