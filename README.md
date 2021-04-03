# Сборка проекта на Gulp 4
## Установка и работа с текущей сборкой
* Установить [**node.js**](https://nodejs.org/en/)
* Скачать или клонировать текущий репозиторий
* Запустить в папке проекта консоль (в Windows через Shift + правый клик => Windows PowerShell)
* Пишем команду **`npm i`**
* Ожидаем установку всех зависимостей
* Работа с сборкой
  * **`gulp`** — задача по умолчанию, позволяет вести разработку в текстовом редакторе и сразу видеть результат в окне браузера
  * **`gulp build`** — сборка проекта (минификация .css/.js файлов, сжатие графики, удаление лишних файлов, архивация проекта)
    * До команды в папке результатов а именно в js и style находятся script.min.js, style.min.js в обычном не сжатом состоянии, после эти файлы сжимаются и в конечном результате добавляются две не сжатые копии дубликаты script.js и style.js.
    * Также в папках js и style присувствуют папки map которые удаляться
    * В папке img если создавался svg sprite будет удалена папка symbol

## Модули:
* [**del**](https://www.npmjs.com/package/del) - Удаление каталогов и файлов
* [**browser-sync**](https://browsersync.io) - Синхронизация кода с результатами в браузере
* [**gulp**](https://gulpjs.com) - Сборщик Gulp
* [**gulp-if**](https://www.npmjs.com/package/gulp-if) - Помогает в сборке
* [**gulp-zip**](https://www.npmjs.com/package/gulp-zip) - Архивируем проект в zip
* [**gulp-changed**](https://www.npmjs.com/package/gulp-changed) - Позволяет обрабатывать только те файлы которые изменились
* [**gulp-clean-css**](https://www.npmjs.com/package/gulp-clean-css) - Минификация и оптимизация CSS файлов
* [**gulp-concat**](https://www.npmjs.com/package/gulp-concat) -  Переименовывает файлы (Объединение нескольких файлов в один)
* [**gulp-include**](https://www.npmjs.com/package/gulp-include) - Объединяет файлы (использую для JS позволяет использовать sourcemaps)
* [**gulp-file-include**](https://www.npmjs.com/package/gulp-file-include) - Объединяет файлы (использую для html)
* [**gulp-plumber**](https://www.npmjs.com/package/gulp-plumber) - Позволяет работать gulp после появления ошибки
* [**gulp-notify**](https://www.npmjs.com/package/gulp-notify) - Показывает уведомление об ошибки
* [**gulp-sourcemaps**](https://www.npmjs.com/package/gulp-sourcemaps) - Cоздает карту кода для консоли в браузере
* [**gulp-fonter**](https://www.npmjs.com/package/gulp-fonter) - Cоздает шрифт TTF из OTF-шрифта
* [**gulp-ttf2woff**](https://www.npmjs.com/package/gulp-ttf2woff) - Cоздает шрифт WOFF из TTF-шрифта
* [**gulp-ttf2woff2**](https://www.npmjs.com/package/gulp-ttf2woff2) - Cоздает шрифт WOFF2 из TTF-шрифта
* [**gulp-svg-sprite**](https://www.npmjs.com/package/gulp-svg-sprite) - Создание SVG спрайтов
* [**gulp-uglify-es**](https://www.npmjs.com/package/gulp-uglify-es) - Сжатие и оптимизация Java Script кода
* [**gulp-imagemin**](https://www.npmjs.com/package/gulp-imagemin) - Для сжатия изображений
* [**webp-converter**](https://www.npmjs.com/package/webp-converter) - Нужен для работы с webp версия 2.2.3!
* [**gulp-webp**](https://www.npmjs.com/package/gulp-webp) - Преобразование изображения в формат файла webp
* [**gulp-webp-html**](https://www.npmjs.com/package/gulp-webp-html) - Автодополнение в html правил совместимости с webp
* [**gulp-webpcss**](https://www.npmjs.com/package/gulp-webpcss) - Автодополнение в css правил совместимости с webp
* [**smart-grid**](https://www.npmjs.com/package/smart-grid) - Адаптивная верстка через css
* [**gulp-less**](https://www.npmjs.com/package/gulp-less) - Компиляция Less файлов
* [**less-plugin-autoprefix**](https://www.npmjs.com/package/less-plugin-autoprefix) - Добавляет префиксы в CSS код
* [**gulp-group-css-media-queries**](https://www.npmjs.com/package/gulp-group-css-media-queries) - Группирует все медиа запросы в css в конце файла

## Автоматическое Формирование `@font-face`:
* Название шривтов не должны иметь пробелов, использовать`( -, _ )`
* Формат наименования шрифта должен быть такого типа:
`name-bold*.woff` или `name-bold*-italic.woff` (Регистр не имеет значения)

#### Пример:
`Banny-ExtraBoldRound-italic.woff`

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
  font-weight: 800;
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
                let weight = checkWeight(fontname.split(/[-_]/)[1])
                let style = fontname.split(/[-_]/)[2] || 'normal'
                console.log(`Шрифт ${fontname} готов! - ${font}, ${weight}, ${style}`)

                if (c_fontname != fontname) {
                    fs.appendFile(
                        source_folder + '/less/include/fonts.less',
                        `.font("${font}", "${fontname}", ${weight}, "${style}");\r\n`,
                        done
                    )
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
