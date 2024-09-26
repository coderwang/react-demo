const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/', // 添加这一行
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								namedExport: false, // v7需要设为false，以支持 import default
								exportLocalsConvention: 'as-is',
								localIdentName: isDev
									? '[path][name]__[local]--[hash:base64:5]'
									: '[local]_[hash:base64:5]',
							},
						},
					},
					'less-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024,
					},
				},
				generator: {
					filename: 'img/[name].[contenthash][ext]',
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							svgoConfig: {
								plugins: [
									{
										name: 'preset-default',
										params: {
											overrides: {
												removeViewBox: false, // 不主动清除ViewBox
											},
										},
									},
								],
							},
						},
					},
					'url-loader', // 支持url的方式
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[contenthash].css',
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 3000,
		historyApiFallback: true, // 解决刷新404问题
	},
};
