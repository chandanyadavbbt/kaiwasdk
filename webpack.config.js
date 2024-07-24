// // webpack.config.js

// const path = require('path');

// module.exports = {
//     mode: 'production',
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'llama-sdk.js',
//         library: 'llamaSDK',
//         libraryTarget: 'umd',
//         umdNamedDefine: true,
//         globalObject: 'this',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env', '@babel/preset-react'],
//                     },
//                 },
//             },
//         ],
//     },
// };








const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.jsx$/, // Handling JSX files
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, // Handling CSS files
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'] // Resolve both JS and JSX files
    }
};
