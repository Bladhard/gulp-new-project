/**
 *###  Click Object
 *#### Вешает события на обьекты при клике
 * Обьекты *`click, open`* при клике  получают класс *`_active`*
 ** *`objectClick`* -  Указываем обьект по которому нужно кликнуть (Кнопка)
 ** *`objectOpen`* -  Указываем обьект который отреагирует на клик (Меню)
 ** *`contentBlock`* - Указываем оболочку контента для обработки закрытия вне этого обьекта
 */

function clickObject(objectClick, objectOpen, contentBlock) {
    const mainObject = document.querySelector(objectClick)
    const dopObject = document.querySelector(objectOpen)
    if (mainObject) {
        mainObject.addEventListener('click', e => {
            mainObject.classList.toggle('_active')
            if (dopObject) {
                dopObject.classList.toggle('_active')
            }
        })
    }
    document.addEventListener('click', closeClick)
    function closeClick(e) {
        if (mainObject.classList.contains('_active')) {
            if (!e.target.closest(contentBlock)) {
                mainObject.classList.remove('_active')
                dopObject.classList.remove('_active')
            }
        }
    }
}

/**
 *###  No Scroll
 *#### Запрещает скролить страницу
 * Вешает на *`body`* класс *`_lock`* cо стилем *`overflow: hidden;`*
 */
function noScroll() {
    const style = document.body.hasAttribute('style')
    console.log(style)
    if (style) {
        document.body.classList.remove('_lock')
        document.body.removeAttribute('style')
    } else {
        document.body.classList.add('_lock')
        document.body.setAttribute('style', 'overflow: hidden;')
    }
}
