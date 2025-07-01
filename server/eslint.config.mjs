// eslint.config.mjs
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';

export default tsEslint.config(
  {
    ignores: ['node_modules', 'dist', '.next', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.strictTypeChecked,
  pluginPrettier,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  }
);