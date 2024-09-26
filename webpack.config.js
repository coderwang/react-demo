const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pxToViewport = require('postcss-px-to-viewport');

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
				use: 'ts-loader',
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									pxToViewport({
										viewportWidth: 375, // 设计稿的视口宽度
										viewportUnit: 'vw', // 希望使用的视口单位
										fontViewportUnit: 'vw', // 字体使用的视口单位
										selectorBlackList: ['.ignore'], // 需要忽略的CSS选择器
										minPixelValue: 1, // 最小的转换数值
										mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
										replace: true, // 是否直接更换属性值
										exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
									}),
								],
							},
						},
					},
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
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		port: 3000,
		historyApiFallback: true, // 解决刷新404问题
	},
};
