/**
 *###  Anchor Smooth
 *#### Плавный скролл для якорей при навигации по странице
 ** *`data-anchor = 'class, id'`* - добавляем к ссылкам якорям *`data`*
  атрибут со значениями конечных обьектов
 */

const menuLinks = document.querySelectorAll('.menu_link[data-anchor]')
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target
        if (menuLink.dataset.anchor && document.querySelector(menuLink.dataset.anchor)) {
            const anchorBlock = document.querySelector(menuLink.dataset.anchor)
            const anchorBlockValue = anchorBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight

            window.scrollTo({
                top: anchorBlockValue,
                behavior: 'smooth',
            })
            e.preventDefault()
        }
    }
}

/* document.querySelectorAll('a._anchor').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault()

        const href = this.getAttribute('href').substring(1)
        const scrollTarget = document.getElementById(href)
        // Указываем высоту навбара если он фиксированный
        const topOffset = 0
        const elementPosition = scrollTarget.getBoundingClientRect().top
        const offsetPosition = elementPosition - topOffset

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
        })
    })
})
 */
