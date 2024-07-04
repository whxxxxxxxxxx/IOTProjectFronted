
// webpack.config.js

import HtmlWebpackPlugin from 'html-webpack-plugin';

export const module = {
    rules: [
        // ...
        {
            test: /\.html$/,
            use: ['html-loader']
        }
    ]
};
export const plugins = [
    // ...
    new HtmlWebpackPlugin({
        template: './src/charts/index.html', // HTML文件的路径
        filename: './src/charts/index1.html' // 构建后HTML文件的路径
    })
];
