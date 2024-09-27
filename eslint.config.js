const reactRecommended = require('eslint-plugin-react/configs/recommended');
const tsRecommended = require('@typescript-eslint/eslint-plugin').configs['recommended'];
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: require('@typescript-eslint/parser'),
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
			react: require('eslint-plugin-react'),
			prettier: require('eslint-plugin-prettier'),
		},
		rules: {
			...reactRecommended.rules,
			...tsRecommended.rules,
			...prettierConfig.rules,
			'prettier/prettier': 'off', // 关闭prettier检查
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'react/prop-types': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
