<template lang="pug">
vue-date-picker(
  v-model="date"
  auto-apply
  :placeholder="$t('component.UiDatePicker.placeholder')"
  :time-config="{ enableTimePicker: false }"
  :locale="localepicker"
  :formats="{ input: formatPicker }"
  :dark="isDark"
)
</template>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { fr, enUS } from 'date-fns/locale'

const { locale } = useI18n()
const isDark = useDark()

const localepicker = computed(() => {
  const locales = {
    'fr': fr,
    'en': enUS,
  }

  return locales[locale.value] || enUS;
})

const formatPicker = computed(() => {
  const formats = {
    'fr': 'dd/MM/yyyy',
    'en': 'yyyy-MM-dd'
  };

  return formats[locale.value] || formats['en'];
})

const date = defineModel({
  get(value: Temporal.PlainDate | null): Date | null {
    return value && new Date(value.toString())
  },
  set(value: Date | null): Temporal.PlainDate | null {
    if (value) {
      const instant = value.toTemporalInstant()
      const zdt = instant.toZonedDateTimeISO(Intl.DateTimeFormat().resolvedOptions().timeZone )
      const plainDate = zdt.toPlainDate();

      return plainDate;
    }

    return null;
  }
});
</script>
