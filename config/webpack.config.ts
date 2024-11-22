import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ServerProxy from './serverProxy';
import { DefinePlugin, Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

console.log('🚀 webpack run: NODE_ENV =>', process.env.NODE_ENV);
console.log('🚀 webpack run: PACKAGE_ENV =>', process.env.PACKAGE_ENV);
console.log('🚀 webpack run: useProxy =>', process.env.useProxy);

const isDev = process.env.NODE_ENV === 'development';

const WebpackConfig: Configuration = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
			assets: path.resolve(__dirname, '../src/assets'),
		},
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
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader（hmr），生产环境使用MiniCssExtractPlugin.loader（缓存）
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
		new DefinePlugin({
			'process.env.PACKAGE_ENV': JSON.stringify(process.env.PACKAGE_ENV),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.ejs'),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[contenthash].css',
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, '../public'), // 启动开发服务器时，指定静态资源目录
		},
		port: 'auto', // 自动选择端口
		open: true,
		historyApiFallback: true, // 解决刷新404问题
		proxy: ServerProxy,
	},
	devtool: isDev ? 'eval-cheap-module-source-map' : 'hidden-source-map',
};

export default WebpackConfig;
