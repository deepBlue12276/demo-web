module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    globals: {
        $: 'readonly'
    },
    parser: 'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    rules: {
        'vue/no-unused-vars': 'off',
        'no-param-reassign': 'off',
        'prettier/prettier': 'error',
        'linebreak-style': 'off',
        'no-restricted-globals': 'off',
        'no-useless-escape': 'off',
        'no-shadow': 'off',
        'consistent-return': 'off',
        eqeqeq: 'off',
        quotes: 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-nested-ternary': 'off',
        'no-irregular-whitespace': 'off',
        'no-use-before-define': 'off',
        'import/no-absolute-path': 'off',
        'vue/no-deprecated-v-on-native-modifier': 'off',
        'no-plusplus': 'off',
        'no-bitwise': 'off',
        'no-multi-assign': 'off',
        'import/no-extraneous-dependencies': [
            'warn',
            {
                devDependencies: ['**vite**', '**@vitejs**'],
                optionalDependencies: false
            }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-expressions': 'off'
    },
    globals: {
        defineProps: true,
        defineEmits: true
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }
        }
    }
};
