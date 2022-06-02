// vue.config.js
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
	// https://vapperjs.org/troubleshooting.html#vue-server-render-throws-an-error
	publicPath: '/',
	assetsDir: 'static',
	lintOnSave: false,
	productionSourceMap: false,
	css: {
		extract: isProd,
		sourceMap: false,
	},
	outputDir: 'dist', // 输出文件目录
	devServer: {
		proxy: {
			'/api': {
				target: 'https://api.bountee.com.my/api/', //正式服
				// target: 'http://n1-03.qjun.com.cn:17780',//慢慢测试服
				// target: 'http://13.212.212.253/game/api/',//测试服
				ws: true,
				changeOrigin: true, //允许跨域
				pathRewrite: {
					'^/api': '/api',
				},
			},
		},
	},
};
