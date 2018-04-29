const path = require('path')

module.exports = {
	entry: path.join(__dirname, 'src/app/js', 'index.js'), // Entry point js file is src/app/js/index.js
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'build.js' // The final file will be created in dist/build.js
	},
	mode: 'development',
	resolve: {
		alias: {
			// When a conctract is compiled, truffle stores the abi and deployed address in a json.
			CompiledContracts: path.resolve(__dirname, 'build/contracts/')
		}
	}
	// Loader for ReactJS.
	// ,
	// module: {
	// 	loaders: [{
	// 		test: /\.css$/, // To load the css in react
	// 		use: ['style-loader', 'css-loader'],
	// 		include: /src/
	// 	}, {
	// 		test: /\.jsx?$/, // To load the js and jsx files
	// 		loader: 'babel-loader',
	// 		exclude: /node_modules/,
	// 		query: {
	// 			presets: ['es2015', 'react', 'stage-2']
	// 		}
	// 	}, {
	// 		test: /\.json$/, // To load the json files
	// 		loader: 'json-loader'
	// 	}]
	// }
}
