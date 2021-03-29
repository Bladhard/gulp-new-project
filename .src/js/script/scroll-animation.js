/**
 *###  Scroll and Animation
 *#### Позволяет активировать созданную анимацию при скролле страницы
 * Для настройки анимаций обьектам присваивается класс *`_active`*
 ** *`_anim-item`* - добавляем к обьекту который нужно анимировать
 ** *`_anim-hide`* - указываем обьектам которые не нужно анимаровать повторно
 */

const animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index]
            const animItemHeight = animItem.offsetHeight
            const animItemOffset = offset(animItem).top
            const animStart = 4

            let animItemPoint = window.innerHeight - animItemHeight / animStart

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart
            }

            if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                animItem.classList.add('_active')
            } else {
                if (!animItem.classList.contains('_anim-hide')) {
                    animItem.classList.remove('_active')
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = indow.pageYOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll()
    }, 500)
}
