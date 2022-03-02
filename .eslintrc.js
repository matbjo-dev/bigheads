module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
    'prettier',
  ],
  plugins: ['vue'],
  rules: {
      "no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
     "vue/multi-word-component-names": ["warn", {
          "ignores": []
      }],
       'vue/script-setup-uses-vars': 'warn',
  }
}