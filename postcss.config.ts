// @ts-expect-error 类型声明文件不存在
import pxToViewport from 'postcss-px-to-viewport';

const PostcssConfig = {
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
};

export default PostcssConfig;
