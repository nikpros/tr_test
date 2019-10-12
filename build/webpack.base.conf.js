const path = require('path') // необходимо для корректного формирования путей в разных ОС
const webpack = require('webpack')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PATHS = { // объект PATHS для более удобного обращения с путями, да и краткости записей
    source: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.source}/pug`
const PAGES = fs.readdirSync(PAGES_DIR).filter(filename => filename.endsWith('.pug'))

module.exports = {
    externals: {    // здесь мы публикуем константу PATHS, чтобы не пришлось копировать её в build, dev
        paths: PATHS
    },
    entry: {    // app == [name] - ярлык точки входа
        app: PATHS.source // т.к. точка входа одна (index.js), то можно не указывать конкретный файл '/index.js'
    },
    output: {
        // filename: '[name].js', //[name] == ярлыку из entry, т.е. каждой точке входа будет соответствовать свой файл
        filename: `${PATHS.assets}js/[name].js`, // используя синтаксис ES6, определяем новый путь для названия результирующего файла
        path: PATHS.dist,    // указываем каталог для создания output
        publicPath: '/' // каталог для webpack-dev-server, где он ищет index.html
    },
    module: {
        rules: [ // на каждое расширение файла по правилу в виде объекта
            {
                test: /\.js$/,  // регулярка для всех js-файлов
                loader: 'babel-loader', // обработчик 'babel-loader' для всех файлов из регулярки в test
                exclude: '/node_modules/'   // исключить папку node_modules из ока лоадера
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [ // у плагинов особенность в подключении
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${PATHS.source}/js/postcss.config.js`
                            }
                        }
                    }
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `${PATHS.source}/js/postcss.config.js`
                            }
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-loader'
                ]
            },
        ]
    },
    plugins: [  // массив для подключения плагинов
            new MiniCssExtractPlugin({
                filename: `${PATHS.assets}css/[name].css`
            }),
            new CopyWebpackPlugin([ // для каждого каталога с целью копирования создается свой объект (откуда - куда)
                {
                    from: `${PATHS.source}/static`,
                    to: ''
                }
            ]),
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,   // *.pug
                filename: `./${page.replace(/\.pug/, '.html')}`  // *.html
            })),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                "window.jQuery": 'jquery'
            })
        ],
}
