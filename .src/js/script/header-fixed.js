/**
 *###  Header Fixed
 *#### Позволяет зафиксировать Header странницы при скролле
 * При работе скрипта обьекты получают класс *`_fixed`*
 ** *`object`* - то что нужно фиксировать
 ** *`active`* - расстояние после которого обьект появиться, по умолчанию 200
 ** *`padding`* - по умолчанию включен, нужен для плавности работы, невелируя разницу шапки
 */

function fixedHeader(object, active = 200, padding = true) {
    const header = document.querySelector(`.${object}`)
    const headerHeight = document.querySelector(`.${object}`).offsetHeight

    if (window.pageYOffset > active) {
        header.classList.add('_fixed')
        header.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;')
        if (padding) {
            document.body.setAttribute('style', `margin-top: ${headerHeight}px;`)
        }
    } else {
        header.classList.remove('_fixed')
        header.removeAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;')
        document.body.removeAttribute('style', `margin-top: ${headerHeight}px;`)
    }
}
