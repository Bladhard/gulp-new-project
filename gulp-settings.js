// Настройки gulp
const settings = {
    webp: {
        webpHTML: false, // заменяет img на picture + делает копии картинок в webp формат
        webpCSS: false, // добовляет поддержку webp в css
    },
    lazyload: {
        dataHTML: false, // замена src, srcset на data-src, data-srcset
        lqipBase64: false, // добавлять Base64 миниатюры в img
    },
}
// Настройки webpack
const webpackSetting = {
    noUglify: {
        mode: 'development',
        output: {
            filename: 'script.js',
        },
        watch: false,
        devtool: false,
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                },
            ],
        },
    },
    build: {
        mode: 'development',
        output: {
            filename: 'script.min.js',
        },
        watch: false,
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: true,
                                        corejs: 3,
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                },
            ],
        },
    },
    prod: {
        mode: 'production',
        output: {
            filename: 'script.min.js',
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        corejs: 3,
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                },
            ],
        },
    },
}
exports.settings = settings
exports.webpackSetting = webpackSetting
