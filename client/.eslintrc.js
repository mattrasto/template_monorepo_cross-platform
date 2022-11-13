module.exports = {
  extends: ['../.eslintrc.js', 'plugin:vue/vue3-recommended'],
  env: { browser: true },
  parser: 'vue-eslint-parser',
  rules: {
    'max-len': [
      1,
      {
        code: 999, // TODO: change later
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'vue/no-deprecated-filter': 0,
    'vue/max-len': [
      'warn',
      {
        template: 999, // TODO: change later
        code: 999, // TODO: change later
        tabWidth: 2,
        ignorePattern: '',
        ignoreComments: true,
        ignoreTrailingComments: false,
        ignoreUrls: true,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: true,
        ignoreHTMLAttributeValues: true,
        ignoreHTMLTextContents: false,
      },
    ],
    'vue/no-deprecated-destroyed-lifecycle': 0, // TODO: Remove when we upgrade to Vue 3
    'vue/no-deprecated-dollar-listeners-api': 0, // TODO: Remove when we upgrade to Vue 3
    'vue/attribute-hyphenation': 0, // remove this after updating all attributes to be hyphenated- otherwise autofix screws up every attribute
    'vue/no-deprecated-v-bind-sync': 0, // TODO: Remove when we upgrade to Vue 3
  },
};
