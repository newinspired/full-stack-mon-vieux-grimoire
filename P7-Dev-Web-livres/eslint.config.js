import js from '@eslint/js';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
            test: 'readonly',
            expect: 'readonly',
        },
    },
    plugins: {
      react,
    },
    rules: {
      quotes: 'off',
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    },
  },
];