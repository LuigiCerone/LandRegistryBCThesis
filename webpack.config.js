const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './app/js/app.js',
    // entry: './app/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            BuildContracts: path.resolve(__dirname, "./ethereum/build/contracts")
        }
    }
};