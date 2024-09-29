const target = {
	mock: 'https://api.weizhipin.com/mock/2980/wapi',
	qa: 'https://hk-m-qa.weizhipin.com/wapi',
	pre: 'https://m-pre.offertoday.com/wapi',
};

module.exports = [
	{
		context: ['/api'],
		target: target[process.env.useProxy],
		pathRewrite: { '^/api': '' },
		changeOrigin: true,
	},
];
