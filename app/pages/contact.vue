<!--
  @TODO: Accessibilité (a11y) manquante
-->
<template lang="pug">
nuxt-layout(name="normal")
  ui-glass-sheet(
    tag="form"
    :class="$style.form"
    @submit.prevent="handleSubmit"
  )
    h1 {{ t('page.contact.title') }}
    label(:for="emailId")
      | {{ t('page.contact.form.email.label') }}
      ui-field-email(
        v-model="r$.$value.email"
        name="email"
        :id="emailId"
        required
      )
      ui-field-error(:errors="r$.email.$errors" hide-details)
    label(:for="patternId")
      | {{ t('page.contact.form.pattern.label') }}
      ui-field-select(
        v-model="r$.$value.pattern"
        :options="options"
        name="pattern"
        :id="patternId"
        required
      )
      ui-field-error(:errors="r$.pattern.$errors" hide-details)

    label(:for="messageId")
      | {{ t('page.contact.form.message.label') }}
      ui-field-text-area(
        v-model="r$.$value.message"
        :id="messageId"
        name="message"
        required
      )
      ui-field-error(:errors="r$.message.$errors" hide-details)

    //- Honeypot
    input(
      :class="$style.websiteField"
      v-model="r$.$value.website"
      name="website"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    )

    ui-button(
      type="submit"
      :disabled="r$.$invalid"
      :class="$style.submitAction"
    ) {{ t('page.contact.form.action.send') }}
</template>

<script setup lang="ts">
import { email, minLength, maxLength, oneOf } from '@regle/rules';

const { t } = useI18n();

const emailId = 'contact-email';
const patternId = 'contact-pattern';
const messageId = 'contact-message';

const patternOptions = [
  t('page.contact.form.pattern.options.question'),
  t('page.contact.form.pattern.options.bug'),
  t('page.contact.form.pattern.options.suggest'),
  t('page.contact.form.pattern.options.rgpd'),
  t('page.contact.form.pattern.options.security'),
  t('page.contact.form.pattern.options.other'),
] as const;

const options = [
  { name: '', value: null, attrs: { hidden: true }},
  { name: 'toto', value: 'tata' },
  ...patternOptions.map((value) => ({ name: value, value }))
  // TODO: Send key instead of translate message
]

const { r$ } = useRegle(
  {
    email: '',
    pattern: '',
    message: '',
    website: '', // Honeypot
  },
  {
    email: { email },
    pattern: {
      oneOf: oneOf(patternOptions)
    },
    message: {
      minLength: minLength(10),
      maxLength: maxLength(5000)
    },
  }
);

// @TODO: Try & catch => error in toast
async function handleSubmit() {
  const { valid } = await r$.$validate();

  if (!valid) {
    return;
  }

  const result = await $fetch('/api/n/feedback/send', {
    method: 'POST',
    body: {
      email: r$.$value.email,
      message: r$.$value.message,
      pattern: r$.$value.pattern && t(r$.$value.pattern),
      website: r$.$value.website,
    }
  })

  // TODO: catch error
  // TODO: Show success
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

.websiteField {
  position: absolute;
  visibility: hidden;
}
</style>
