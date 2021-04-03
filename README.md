# Сборка проекта на Gulp 4

## Модули:
    "browser-sync": Синхронизация кода с результатами в браузере
    "del": Удаление каталогов и файлов
    "gulp": Сборщик Gulp
    "gulp-zip": gulp-zip
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

### Автоматическое Формирование `@font-face`:
* Название шривтов не должны иметь пробелов, использовать`( -, _ )`
* Формат наименования шрифта должен быть такого типа:
`name-bold*.woff` или `name-bold*-italic.woff` (Регистр не имеет значения)
> Пример:
> > Banny-ExtraBoldRound-italic.woff

> Результат:
> > .font("Banny", "Banny-ExtraBoldRound-italic", "800", "italic");
```css
@font-face {
  font-family: Banny;
  font-display: swap;
  src: url(../fonts/Banny-ExtraBoldRound-italic.woff) format("woff");
  font-weight: "800";
  font-style: italic
}
```
