const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	transpileDependencies: true,

	devServer: {
		allowedHosts: ['stats.bronbro.io']
	}
})