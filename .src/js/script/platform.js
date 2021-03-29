/**
 *###  Device Platform
 *#### Определяет наличие тачскрина на устройвстве
 * В зависимости от устройвства тегу *`body`* дается один из классов:
 ** *`_touch`* - Для устройвств с Тачскрином
 ** *`_pc`* - Для обычных ПК версий
 */

function platformDevice() {
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        IOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function () {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows()
        },
    }

    if (isMobile.any()) {
        document.body.classList.add('_touch')
    } else {
        document.body.classList.add('_pc')
    }
}
