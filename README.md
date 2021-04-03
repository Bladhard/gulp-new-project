# Сборка проекта на Gulp 4

## Модули:
    "browser-sync": Синхронизация кода с результатами в браузере
    "del": Удаление каталогов и файлов
    "gulp": Сборщик Gulp
    "gulp-zip": Архивируем проект в zip
    "gulp-changed": Позволяет обрабатывать только те файлы которые изменились
    "gulp-clean-css": Минификация и оптимизация CSS файлов
    "gulp-concat":  Переименовывает файлы (Объединение нескольких файлов в один)
    "gulp-include": Объединяет файлы (использую для JS позволяет использовать sourcemaps)
    "gulp-file-include": Объединяет файлы (использую для html)
    "gulp-plumber": Позволяет работать gulp после появления ошибки
    "gulp-notify": Показывает уведомление об ошибки
    "gulp-sourcemaps": Cоздает карту кода для консоли в браузере
    "gulp-fonter": Cоздает шрифт TTF из OTF-шрифта
    "gulp-ttf2woff": Cоздает шрифт WOFF из TTF-шрифта
    "gulp-ttf2woff2": Cоздает шрифт WOFF2 из TTF-шрифта
    "gulp-svg-sprite": Создание SVG спрайтов
    "gulp-uglify-es": Сжатие и оптимизация Java Script кода
    "gulp-imagemin": Для сжатия изображений
    "webp-converter": Нужен для работы с webp версия 2.2.3!
    "gulp-webp": Преобразование изображения в формат файла webp
    "gulp-webp-html": Автодополнение в html правил совместимости с webp
    "gulp-webpcss": Автодополнение в css правил совместимости с webp
    "smart-grid": Адаптивная верстка через css
    "gulp-less": Компиляция Less файлов
    "less-plugin-autoprefix": Добавляет префиксы в CSS код
    "gulp-group-css-media-queries": Группирует все медиа запросы в css в конце файла

## Автоматическое Формирование `@font-face`:
* Название шривтов не должны иметь пробелов, использовать`( -, _ )`
* Формат наименования шрифта должен быть такого типа:
`name-bold*.woff` или `name-bold*-italic.woff` (Регистр не имеет значения)

#### Пример:
Banny-ExtraBoldRound-italic.woff

#### Результат:
Миксин *Less*
```less
.font("Banny", "Banny-ExtraBoldRound-italic", "800", "italic");
```
Исходный код *CSS*
```css
@font-face {
  font-family: Banny;
  font-display: swap;
  src: url(../fonts/Banny-ExtraBoldRound-italic.woff) format("woff");
  font-weight: "800";
  font-style: italic
}
```
### Code JS
#### Функция определения `font-weight` по имени шрифта:
```javascript
function checkWeight(fontname) {
    const lowCase = fontname.toLowerCase()
    const fontStyle = {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        extrabold: 800,
        bold: 700,
        heavy: 700,
        black: 900,
    }
    for (let keys of Object.keys(fontStyle)) {
        if (lowCase.indexOf(keys) > -1) {
            if (lowCase.indexOf(keys)) {
                return fontStyle[keys]
            } else {
                return fontStyle[keys]
            }
        }
    }
    return 400
}
```
#### Функция определения всех параметров шрифта и передачи значений миксину:
```javascript
function fontsStyle(done) {
    fs.writeFileSync(`${source_folder}/less/include/fonts.less`, '')
    fs.appendFileSync(source_folder + '/less/include/fonts.less', '// main: ./main.less\r\n\n')
    return fs.readdir(path.build.fonts, (err, items) => {
        if (items) {
            let c_fontname
            for (var i = 0; i < items.length; i++) {
                let fontname = items[i].split('.')
                fontname = fontname[0]
                let font = fontname.split(/[-_]/)[0]
                console.log(fontname.split(/[-_]/))
                let weight = checkWeight(fontname.split(/[-_]/)[1])
                let style = fontname.split(/[-_]/)[2] || 'normal'
                if (c_fontname != fontname) {
                    fs.appendFile(source_folder + '/less/include/fonts.less',
                    '.font("' + font + '", "' + fontname + '", "' + weight + '", "' + style + '");\r\n',
                     done)
                }
                c_fontname = fontname
            }
        }
        done()
    })
}
```
### Mixin Less
```less
.font(@font_name, @file_name, @weight, @style) {
    @font-face {
        font-family: @font_name;
        font-display: swap;
        src: url("../fonts/@{file_name}.woff") format("woff"),
        url("../fonts/@{file_name}.woff2") format("woff2"); // по выбору
        font-weight: @weight;
        font-style: @style;
    }
}
```
