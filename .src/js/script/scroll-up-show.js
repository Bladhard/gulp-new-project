class ScrollShow {
    constructor(objectClick) {
        this.objectClick = objectClick
    }

    showUpScroll(scrollHeight) {
        let scrollPrev = 0
        const objectsList = this.objectClick
        const mainObject = document.querySelector(this.objectClick)
        console.log(this.scrollHeight)

        window.onscroll = function () {
            const scrolled = window.pageYOffset
            const headerHeaght = document.querySelector('.header').offsetHeight

            if (scrolled >= (scrollHeight || headerHeaght) && scrolled < scrollPrev) {
                console.log(scrollPrev)
                if (objectsList.length > 1) {
                    objectsList.forEach(item => {
                        const mainObjects = document.querySelector(item)
                        mainObjects.classList.add('_show-up')
                    })
                } else {
                    mainObject.classList.add('_show-up')
                }
            } else {
                if (objectsList.length > 1) {
                    objectsList.forEach(item => {
                        const mainObjects = document.querySelector(item)
                        mainObjects.classList.remove('_show-up')
                    })
                } else {
                    mainObject.classList.remove('_show-up')
                }
            }
            scrollPrev = scrolled
        }
    }
}

// const header = new ScrollShow(['.header__title', '.header'])
// header.showUpScroll(200)

function showUpScrollLite(objectClick, scrollHeight) {
    let scrollPrev = 0
    const mainObject = document.querySelector(objectClick)
    window.onscroll = function () {
        const scrolled = window.pageYOffset
        const headerHeaght = document.querySelector('.header').offsetHeight

        if (scrolled >= (scrollHeight || headerHeaght) && scrolled < scrollPrev) {
            console.log(scrollPrev)
            mainObject.classList.add('_show-up')
        } else {
            mainObject.classList.remove('_show-up')
        }
        scrollPrev = scrolled
    }
}

//=======================================================

function showUpScroll(objectShow, scrollHeight) {
    let timeout = 300
    let scrollPrev = 0
    const header = document.querySelector(objectShow)
    const anchorView = document.querySelector('.anchor')

    window.onscroll = function () {
        const scrolled = window.pageYOffset
        const headerHeight = document.querySelector(objectShow).offsetHeight
        const oneSectionHeight = document.querySelector('.header').offsetHeight

        archorView.addEventListener('click', e => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
            e.preventDefault()
        })

        if (scrolled >= (scrollHeight || oneSectionHeight) && scrolled < scrollPrev) {
            anchorView.classList.add('_anchor-show')
            header.classList.add('_fixed')
            header.classList.remove('_stop-fixed')
            document.body.setAttribute('style', `margin-top: ${headerHeight}px;`)
        } else {
            archorView.classList.remove('_anchor-show')

            mainObject.classList.remove('_active')
            dopObject.classList.remove('_active-burger')
            mainObject.classList.remove('_open')
            mainObject.classList.add('_close')

            if (scrolled >= (scrollHeight || oneSectionHeight) && header.classList.contains('_fixed')) {
                header.classList.remove('_fixed')
                header.classList.add('_stop-fixed')
            } else {
                if (header.classList.contains('_stop-fixed')) {
                    document.body.setAttribute('style', `margin-top: ${headerHeight}px;`)
                } else {
                    if (header.classList.contains('_fixed')) {
                        header.classList.remove('_fixed')
                        header.classList.add('_stop-fixed')
                        setTimeout(() => {
                            header.classList.remove('_stop-fixed')
                            document.body.removeAttribute('style', `margin-top: ${headerHeight}px;`)
                        }, timeout)
                    }
                }
            }
        }
        scrollPrev = scrolled
    }
}

let setting = {
    objectShow: '.nav', // Шапка сайта
    oneSection: '.header', // Указываем первую секцию сайта для автоматического расчета для срабатывания скрипта по умолчанию header
    scrollHeight: 300, // Указываем вместо oneSection расстояние после которого сработает скрипт
    anchorObject: '.anchor', // Кнопка якорь вверх
}

;('_anchor-show')
;('_fixed')
;('_stop-fixed')
;('_active')
;('_active-burger')
;('_open')
;('_close')
