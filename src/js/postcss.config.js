
// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev

module.exports = {
    plugins: [
        require('autoprefixer'),    // добавляем вендорные префиксы для кросс-браузерности
        require('css-mqpacker'),    // склеиваем все медиа-файлы в один
        require('cssnano')({    // минифицируем css файлы
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}