import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import vue3Recommended from 'eslint-plugin-vue/lib/configs/vue3-recommended.js';

export default [
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue: vuePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...vue3Recommended.rules,
      'prettier/prettier': 'error',
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
            'GLOBAL', // id
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

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },

  prettierConfig,
];
