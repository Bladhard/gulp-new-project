/**
 *###  lazy-Loading
 *#### Отложенная загрузка изображений
 ** *`loading`* - класс для изображений которые будут загружаться отложенно
 ** *`data-srcset`* - дата атрибут для webp формата
 ** *`data-src`* - дата атрибут для остальных форматов
 */

function hasWebP(callback) {
    var webP = new Image()
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2)
    }
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}

const options = {
    root: null,
    rootMargin: '0px 0px 300px 0px',
    threshold: 0.05,
}

const lazzyLoading = new IntersectionObserver((entries, observer) => {
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
                    entry.target.classList.remove('loading')
                }
            } catch (TypeError) {
                entry.target.onload = () => {
                    entry.target.classList.remove('loading')
                }
            }
            observer.unobserve(entry.target)
        }
    })
}, options)

document.querySelectorAll('picture').forEach(picture => lazzyLoading.observe(picture))
document.querySelectorAll('div.loading').forEach(div => lazzyLoading.observe(div))
document.querySelectorAll('img.loading').forEach(img => lazzyLoading.observe(img))
