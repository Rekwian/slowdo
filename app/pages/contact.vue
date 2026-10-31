<!--
  @TODO: Accessibilité (a11y) manquante
-->
<template lang="pug">
nuxt-layout(name="normal")
  //- SERVER ERROR
  ui-glass-sheet(
    v-if="serverError"
    :class="$style.sheet"
  )
    | {{ t('api.error.serverError') }}
    ui-button(@click="serverError = false") fermer

  //- SERVER SUCCESS
  ui-glass-sheet(
    v-else-if="serverSuccess"
    :class="$style.sheet"
  )
    | {{ t('page.contact.form.response.messageSendWithSuccess') }}
    ui-button(@click="closeSuccess") fermer

  //- FORM
  ui-glass-sheet(
    v-else
    tag="form"
    :class="$style.form"
    @submit.prevent="handleSubmit"
    :disabled="loading || serverError"
  )

    h1 {{ t('page.contact.title') }}
    label(:for="emailId")
      | {{ t('page.contact.form.email.label') }}
      ui-field-email(
        v-model="formData.email"
        name="email"
        :id="emailId"
        :disabled="loading"
      )
      ui-field-error(:errors="r$.email.$errors" hide-details)
    label(:for="patternId")
      | {{ t('page.contact.form.pattern.label') }}
      ui-field-select(
        v-model="formData.pattern"
        :options="options"
        name="pattern"
        :id="patternId"
        :disabled="loading"
      )
      ui-field-error(:errors="r$.pattern.$errors" hide-details)

    label(:for="messageId")
      | {{ t('page.contact.form.message.label') }}
      ui-field-text-area(
        v-model="formData.message"
        :id="messageId"
        name="message"
        :disabled="loading"
      )
      ui-field-error(:errors="r$.message.$errors" hide-details)

    //- Honeypot
    input(
      :class="$style.websiteField"
      v-model="formData.website"
      name="website"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    )

    ui-button(
      type="submit"
      :disabled="r$.$invalid"
      :class="$style.submitAction"
    )
      template(v-if="loading")
        icons-spinner
      template(v-else)
        | {{ t('page.contact.form.action.send') }}
</template>

<script setup lang="ts">
import type { RegleExternalFieldIssue, RegleExternalIssueTree } from '@regle/core';
import { FetchError } from 'ofetch';
import { z } from 'zod';

const { t } = useI18n();

const emailId = 'contact-email';
const patternId = 'contact-pattern';
const messageId = 'contact-message';

const loading = ref(false);
const serverError = ref(false);
const serverSuccess = ref(false);

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
  ...patternOptions.map((value) => ({ name: value, value }))
  // @TODO: Send key instead of translate message
]

const formData = reactive({
    email: '',
    pattern: '',
    message: '',
    website: '',
})

const externalIssues = ref<RegleExternalIssueTree<typeof formData>>({});

const { r$ } = useRegleSchema(
  formData,
  z.object({
    email: z.email(),
    pattern: z.enum(patternOptions),
    message: z.string().min(10).max(5000),
  }),
  {
    externalIssues
  }
);

function closeSuccess() {
  serverSuccess.value = false;

  formData.email = '';
  formData.pattern = '';
  formData.message = '';
  r$.$reset();
}

async function handleSubmit() {
  const { valid } = await r$.$validate();

  if (!valid) {
    return;
  }

  try {
    loading.value = true;

    await $fetch('/api/fr/feedback/send', {
      method: 'POST',
      body: {
        email: formData.email,
        message: formData.message,
        pattern: formData.pattern && t(formData.pattern),
        website: formData.website,
      }
    })
    serverSuccess.value = true;
  } catch(e) {
    type ErrorField = 'email' | 'message' | 'pattern';
    interface error { field: string, message: string }

    const errorMessages: Record<ErrorField, RegleExternalFieldIssue[]> = {
        email: [],
        message: [],
        pattern: [],
    }

    if (e instanceof FetchError && e.data?.errors?.length) {
      e.data.errors.forEach((error: error) => {
        const { field, message } = error

        errorMessages[field as ErrorField]?.push({
          $property: field,
          $message: message,
          code: 'EMAIL_TAKEN',
        });
      })

      r$.$setExternalIssues(errorMessages);
    } else {
      serverError.value = true
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style module>
.sheet {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  margin: auto;
  max-width: max-content;
}

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
