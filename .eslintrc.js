module.exports = {
  extends: ['airbnb-base', 'plugin:vue/vue3-recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    parser: 'babel-eslint',
  },
  rules: {
    'array-callback-return': 1,
    curly: ['error', 'multi'],
    'nonblock-statement-body-position': ['error', 'any'],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': [2, 'always'],
    'comma-dangle': [0, 'always-multiline'],
    'function-paren-newline': 0,
    'linebreak-style': 0,
    'no-alert': 1,
    'no-console': 1,
    'no-continue': 0,
    'no-param-reassign': 1,
    'no-restricted-syntax': 1,
    'no-underscore-dangle': 0,
    'operator-linebreak': 0, // Conflicts with Prettier
    'prefer-promise-reject-errors': 0,
    semi: ['error', 'always'],
    'no-unused-vars': [1, { argsIgnorePattern: '^_' }], // Allow _<name> variables to be unused
    camelcase: 0,
    'import/no-mutable-exports': 1,
    'import/no-extraneous-dependencies': 1,
    'import/named': 1,
    'import/prefer-default-export': 0,
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-use-before-define': ['error', { variables: false, functions: false }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // Ignore aliases starting with @
    // TODO: Remove when alias resolution works
    'import/no-unresolved': [2, { ignore: ['^@'] }],
    'import/extensions': ['error', 'ignorePackages'],
  },
};
