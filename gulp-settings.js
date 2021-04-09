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
exports.settings = settings
