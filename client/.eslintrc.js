module.exports = {
  extends: ['airbnb-base', 'plugin:vue/vue3-recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['jest'],
  env: { browser: true, 'jest/globals': true },
  rules: {
    'array-callback-return': 1,
    'arrow-body-style': 0,
    'arrow-parens': [2, 'always'],
    'comma-dangle': [0, 'always'],
    'function-paren-newline': 0,
    'import/named': 1,
    'import/no-extraneous-dependencies': 1,
    'import/no-mutable-exports': 1,
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'max-len': [
      1,
      {
        code: 999, // TODO: change later
        ignoreTemplateLiterals: true,
        ignoreComments: true
      }
    ],
    'no-alert': 1,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-continue': 0,
    'no-param-reassign': 1,
    'no-restricted-syntax': 1,
    'no-underscore-dangle': 0,
    'operator-linebreak': 0, // Conflicts with Prettier
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    semi: ['error', 'always'],
    'no-unused-vars': 1,
    camelcase: 0,
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
        ignoreHTMLTextContents: false
      }
    ],
    'vue/no-deprecated-destroyed-lifecycle': 0, // TODO: Remove when we upgrade to Vue 3
    'vue/no-deprecated-dollar-listeners-api': 0, // TODO: Remove when we upgrade to Vue 3
    'vue/attribute-hyphenation': 0, // remove this after updating all attributes to be hyphenated- otherwise autofix screws up every attribute
    'vue/no-deprecated-v-bind-sync': 0, // TODO: Remove when we upgrade to Vue 3
    // Ignore aliases starting with @
    // TODO: Remove when alias resolution works
    'import/no-unresolved': [2, { ignore: ['^@'] }],
    'import/extensions': ['error', 'ignorePackages']
  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEVTOOLS__: true,
    socket: true,
    webpackIsomorphicTools: true
  },
  settings: {
    'import/resolver': {
      node: {
        // Set base paths from which we can import directly
        paths: ['src', 'node_modules', 'static'],
        extensions: ['', '.json', '.js', '.vue']
      },
      // QUESTION: Why aren't these being properly traversed?
      alias: {
        map: [
          ['@', '../'],
          ['@pages', './src/pages'],
          ['@components', './src/components'],
          ['@store', './src/store'],
          ['@static', './static']
        ],
        extensions: ['', '.json', '.js', '.vue']
      },
      webpack: { config: './webpack/development/webpack.babel.js' }
    }
  }
};
