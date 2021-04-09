/**
 *###  lazy-Loading
 *#### Отложенная загрузка изображений
 ** *`lazyload`* - класс для блоков с изображениями или изображений которые будут загружаться отложенно
 ** *`data-srcset`* - дата атрибут для webp формата
 ** *`data-src`* - дата атрибут для остальных форматов
 */

function LazyLoad(options = false) {
    const defaults = {
        selector: 'lazyload',
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0,
    }
    const root = options.root || defaults.root,
        rootMargin = options.rootMargin || defaults.rootMargin,
        threshold = options.threshold || defaults.threshold,
        selector = options.selector || defaults.selector

    // проверка на поддержку браузером формата webp
    function hasWebP(callback) {
        const webP = new Image()
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2)
        }
        webP.src =
            'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }

    function selectorAll(selector, what) {
        const search = document.querySelectorAll(selector)
        search.forEach(what => ObserverLoading.observe(what))
    }

    const ObserverLoading = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target.querySelector('img'),
                        source = entry.target.querySelector('source')

                    hasWebP(function (support) {
                        if (support == true && source) {
                            source.srcset = source.dataset.srcset
                            source.removeAttribute('data-srcset')
                        } else {
                            try {
                                img.src = img.dataset.src
                                img.removeAttribute('data-src')
                            } catch (TypeError) {
                                entry.target.src = entry.target.dataset.src
                                entry.target.removeAttribute('data-src')
                            }
                        }
                    })
                    try {
                        img.onload = () => {
                            entry.target.classList.remove(`${selector}`)
                        }
                    } catch (TypeError) {
                        entry.target.onload = () => {
                            entry.target.classList.remove(`${selector}`)
                        }
                    }
                    observer.unobserve(entry.target)
                }
            })
        },
        { root, rootMargin, threshold }
    )
    selectorAll(`picture.${selector}`, 'picture')
    selectorAll(`div.${selector}`, 'div')
    selectorAll(`img.${selector}`, 'img')
}
