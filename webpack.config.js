const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist')
    },
    resolve: {
        alias: {
            BuildContracts: path.resolve(__dirname, "./ethereum/build/contracts")
        }
    }
};