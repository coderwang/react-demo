import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Chunk, DefinePlugin, Module, Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import ServerProxy from './serverProxy';

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
		publicPath: '/', // 指定打包后资源的路径前缀
		filename: 'js/[name].[contenthash].js', // 入口文件的名称
		chunkFilename: 'js/[name].[contenthash].chunk.js', // 非入口文件的名称
		assetModuleFilename: 'assets/[name].[hash][ext]', // 资源文件的名称，优先级低于loader中的配置
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
				test: /\.module\.(c|le)ss$/,
				use: [
					/**
					 * 开发环境使用style-loader，在js中动态插入style标签
					 * 生产环境使用MiniCssExtractPlugin.loader，将css标记出来，在打包阶段使用MiniCssExtractPlugin提取出来，生成单独的css文件，并用link标签引入
					 */
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
							importLoaders: 2, // 确保遇到 @import 的文件，也先经过less-loader，再经过postcss-loader
							// 0 => no loaders (default);
							// 1 => postcss-loader;
							// 2 => postcss-loader, less-loader
						},
					},
					'postcss-loader',
					'less-loader', // 优先处理less，再交给postcss处理
				],
			},
			{
				test: /\.(c|le)ss$/,
				exclude: /\.module\.(c|le)ss$/, // 确保普通的 .css 和 .less 文件不会匹配到模块化规则（去掉这行会报错，暂不知道原因）
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: false,
							importLoaders: 2,
						},
					},
					'postcss-loader',
					'less-loader',
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
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, '../public'), to: '' },
				// 可以添加多个 pattern 来复制多个不同的源到不同的目标位置
			],
		}),
		new DefinePlugin({
			'process.env.PACKAGE_ENV': JSON.stringify(process.env.PACKAGE_ENV),
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.ejs'),
			favicon: path.resolve(__dirname, '../public/favicon.ico'),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[contenthash].css',
		}),
	],
	optimization: {
		// `...` 表示保留webpack默认的压缩器（如terser-webpack-plugin）
		// CssMinimizerPlugin 用于压缩CSS文件
		minimizer: [`...`, new CssMinimizerPlugin()],
		splitChunks: {
			chunks: 'all',
			name: (_module: Module, chunks: Chunk[], _cacheGroupKey: string) => {
				return `vendor-${chunks[0].name}`;
			},
			cacheGroups: {
				// 将node_modules中的第三方库打包成一个名为vendors的js文件
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: -10,
				},
				// 将项目中被多个chunk引用的模块打包成一个名为common的js文件
				common: {
					name: 'common',
					minChunks: 2,
					priority: -20,
				},
			},
		},
		runtimeChunk: 'single', // 将webpack的runtime代码单独打包成一个名为runtime的js文件
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '../public'), // 启动开发服务器时，指定静态资源目录
		},
		port: 'auto', // 自动选择端口
		open: true,
		historyApiFallback: true, // 解决刷新404问题
		proxy: ServerProxy,
		allowedHosts: 'all', // 不校验host，避免使用whistle代理后，无法拿到开发服务器资源
	},
	devtool: isDev ? 'eval-cheap-module-source-map' : 'hidden-source-map',
};

export default WebpackConfig;
