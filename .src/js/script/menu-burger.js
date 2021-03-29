//===========| Скрипт Burger Menu |===========
/**
* Создание меню 'бургер' с доп функциями:
* Различные настройки для ПК версии и версии с Тачскринам
* Плавный якорь по ссылкам

* _touch - добавляет класс к body для устройвств с тачскринами
* _pc - добавляет класс к body для компьютера
* data-anchor = '' - добовляем к ссылкам якорям
=============================================*/

// Проверяем на каком устройстве запущен сайт

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

    let menuArrows = document.querySelectorAll('.menu__arrow')
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index]
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('_active')
            })
        }
    }
} else {
    document.body.classList.add('_pc')
}

// Burger Menu

const burgerMenu = document.querySelector('.menu__burger')
const menuBody = document.querySelector('.menu__body')
if (burgerMenu) {
    burgerMenu.addEventListener('click', e => {
        document.body.classList.toggle('_lock')
        burgerMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}
document.addEventListener('click', closeClick)
function closeClick(e) {
    if (burgerMenu.classList.contains('_active')) {
        if (!e.target.closest('.menu__content')) {
            document.body.classList.remove('_lock')
            burgerMenu.classList.remove('_active')
            menuBody.classList.remove('_active')
        }
    }
}

// Якорь - прокрутка при клике

const menuLinks = document.querySelectorAll('.menu_link[data-anchor]')
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target
        if (menuLink.dataset.anchor && document.querySelector(menuLink.dataset.anchor)) {
            const anchorBlock = document.querySelector(menuLink.dataset.anchor)
            const anchorBlockValue = anchorBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('nav').offsetHeight

            if (burgerMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock')
                burgerMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: anchorBlockValue,
                behavior: 'smooth',
            })
            e.preventDefault()
        }
    }
}
