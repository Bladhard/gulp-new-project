//===========| Скрипт Pop-Up окон |===========

// Создание Pop-Up - используем родителя с классом popup
// Помещаем весь контент в popup__content
// Открытие Pop-Up - popup-link
// Закрытие Pop-Up - close-popup
// Горячая клавиша закрытия <ESC>
// wrapper - оболчка всего контетна для фиксированной позиции контента при исчезании скрола
// lock-padding - указываем для фиксированных обьектов типа шапки nav к дополнению к wrapper
// ===========================================

const popupLinks = document.querySelectorAll('.popup-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true
// Указываем время анимации Pop-Up
const timeout = 800

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index]
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '')
            const curentPopup = document.getElementById(popupName)
            popupOpen(curentPopup)
            e.preventDefault()
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup')
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index]
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
            e.preventDefault()
        })
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open')
        if (popupActive) {
            popupClose(popupActive, false)
        } else {
            bodyLock()
        }
        curentPopup.classList.add('open')
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'))
            }
        })
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open')
        if (doUnlock) {
            bodyUnLock()
        }
    }
}

function bodyLock() {
    const LockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index]
            el.style.paddingRight = LockPaddingValue
        }
    }

    body.style.paddingRight = LockPaddingValue
    body.classList.add('lock')

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index]
                el.style.paddingRight = '0px'
            }
        }
        body.style.paddingRight = '0px'
        body.classList.remove('lock')
    }, timeout)

    unlock = false
    setTimeout(function () {
        unlock = true
    }, timeout)
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector('.popup.open')
        popupClose(popupActive)
    }
})
