module.exports = {
  extends: ['next/core-web-vitals'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn',
      'no-unused-expressions': 'warn',
      'no-extra-semi': 'warn',
    },
  },
}
