const reactPlugin = require('eslint-plugin-react');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
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
			react: reactPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			// React 基础规则
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',

			// TypeScript 规则
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],

			// Prettier
			'prettier/prettier': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	// 关闭 prettier 与 eslint 冲突的规则
	prettierConfig,
];
