const target = {
	mock: 'https://api.weizhipin.com/mock/2980/wapi',
	qa: 'https://hk-m-qa.weizhipin.com/wapi',
	pre: 'https://m-pre.offertoday.com/wapi',
};

const ServerProxy = [
	{
		context: ['/api'],
		target: target[process.env.useProxy as keyof typeof target],
		pathRewrite: { '^/api': '' },
		changeOrigin: true,
	},
];

export default ServerProxy;
