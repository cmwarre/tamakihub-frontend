var path = require('path');

module.exports = {
    entry: "./app/app.js",
    output: {
        filename: "public/js/bundle.js",
        sourceMapFilename: "public/js/bundle.map"
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.js/,   loader: 'babel', exclude: /node_modules/
            },
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
            // {
            //     test: /\.less/, loader: 'style!css!less'
            // },
            // {
            //     test: /\.css/, loader: 'style!css'
            // },
            // {
            //     test: /\.png$/,
            //     loader: "url-loader?limit=100000"
            // },
            // {
            //     test: /\.jpg$/,
            //     loader: "file-loader"
            // },
            // {
            //     test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&mimetype=application/font-woff'
            // },
            // {
            //     test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&mimetype=application/octet-stream'
            // },
            // {
            //     test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'file'
            // },
            // {
            //     test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            //     loader: 'url?limit=10000&mimetype=image/svg+xml'
            // },
        ]
    }
};