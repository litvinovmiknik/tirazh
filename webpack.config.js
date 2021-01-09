export default {
    mode: 'none',
    watch: false,
    watchOptions: {
        ignored: ['bower_components', 'node_modules']
    },
    entry: {
        index: './index.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}