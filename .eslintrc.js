module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    'prettier/prettier': ['error', require('./.prettierrc')],
  },
};
