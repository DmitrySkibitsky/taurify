import eslintPluginVue from 'eslint-plugin-vue';
import typescriptEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import vueParser from 'vue-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': typescriptEslint.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended[0].rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: typescriptEslint.parser,
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptEslint.plugin,
    },
    rules: {
      ...eslintPluginVue.configs['flat/strongly-recommended'].rules,
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: false },
      ],
      'prettier/prettier': 'error',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'never',
            component: 'always',
          },
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: {
            max: 1,
            allowFirstLine: false,
          },
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION', // is, v-is
            'LIST_RENDERING', // v-for
            'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
            'RENDER_MODIFIERS', // v-once, v-pre
            'GLOBAL', // idAdd commentMore actions
            ['UNIQUE', 'SLOT'], // ref, key, slot
            'TWO_WAY_BINDING', // v-model
            'OTHER_DIRECTIVES', // other v-directives
            'ATTR_DYNAMIC', // 'v-bind:prop="foo"', ':prop="foo"'
            'ATTR_STATIC', // 'prop="foo"', 'custom-prop="foo"'
            'ATTR_SHORTHAND_BOOL', // 'boolean-prop'
            'CONTENT', // text content
            'EVENTS', // @click, @input
          ],
          alphabetical: false,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
