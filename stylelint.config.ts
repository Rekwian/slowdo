export default {
  extends: 'stylelint-config-recommended-vue',
  overrides: [
    {
      files: ['*.vue', '**/*.vue'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'color-function-notation': 'modern',
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
  },
};
