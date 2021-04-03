const project_folder = require('path').basename(__dirname)
const source_folder = '.src'

const fs = require('fs')

let isDev = false

const path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/style/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: source_folder + '/*.html',
        css: source_folder + '/less/main.less',
        js: source_folder + '/js/main.js',
        img: source_folder + '/img/**/*.{png,jpg,jpeg,gif,ico,svg,webp}',
        fonts: source_folder + '/fonts/*.{ttf,woff}',
    },
    watch: {
        html: source_folder + '/**/*.html',
        css: source_folder + '/less/**/*.less',
        js: source_folder + '/js/**/*.js',
        img: source_folder + '/img/*.{png,jpg,jpeg,gif,ico,svg,webp}',
        img2: source_folder + '/img/**/*.{png,jpg,jpeg,gif,ico,webp}',
        svg: source_folder + '/img/iconsprite/*.svg',
    },
    clear: './' + project_folder + '/',
}

const { src, dest, watch, parallel, series } = require('gulp')

const cssMediaQueries = require('gulp-group-css-media-queries')
const settings = require('./.src/js/smartgrid').settings
const browsersync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const fileinclude = require('gulp-file-include')
const sourcemaps = require('gulp-sourcemaps')
const svgSprite = require('gulp-svg-sprite')
const ttf2woff2 = require('gulp-ttf2woff2')
const webpHTML = require('gulp-webp-html')
const cleanCSS = require('gulp-clean-css')
const ttf2woff = require('gulp-ttf2woff')
const imagemin = require('gulp-imagemin')
const include = require('gulp-include')
const webpcss = require('gulp-webpcss')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')
const smartgrid = require('smart-grid')
const fonter = require('gulp-fonter')
const notify = require('gulp-notify')
const concat = require('gulp-concat')
const webp = require('gulp-webp')
const less = require('gulp-less')
const gulpif = require('gulp-if')
const zip = require('gulp-zip')
const mpath = require('path')
const del = require('del')

const LessAutoprefix = require('less-plugin-autoprefix')
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'], cascade: false })

/*=======================| BrowserSync |=======================*/

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/',
        },
        port: 3200,
        notify: false,
        online: true,
    })
}

/*=======================| Less |=======================*/

function css() {
    return src(path.src.css)
        .pipe(
            plumber({
                errorHandler: notify.onError({
                    message: 'Error: <%= error.message %>',
                    title: 'Less',
                    sound: false,
                }),
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            less({
                plugins: [autoprefix],
                paths: [mpath.join(__dirname, 'less', 'includes')],
            })
        )
        .pipe(cssMediaQueries())
        .pipe(
            webpcss({
                webpClass: '.webp',
                noWebpClass: '.no-webp',
            })
        )
        .pipe(
            cleanCSS({
                format: 'beautify',
                level: {
                    2: {
                        restructureRules: true,
                    },
                },
            })
        )
        .pipe(gulpif(isDev, concat('style.css')))
        .pipe(gulpif(isDev, dest(path.build.css)))
        .pipe(
            gulpif(
                isDev,
                cleanCSS({
                    level: {
                        2: {
                            restructureRules: true,
                        },
                    },
                })
            )
        )
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

/*=======================| JavaScript |=======================*/

function js() {
    return src(path.src.js)
        .pipe(
            plumber({
                errorHandler: notify.onError({
                    message: 'Error: <%= error.message %>',
                    title: 'JavaScript',
                    sound: false,
                }),
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            include({
                extensions: 'js',
                hardFail: true,
                includePaths: [__dirname + '/.src/js'],
            })
        )
        .pipe(gulpif(isDev, concat('script.js')))
        .pipe(gulpif(isDev, dest(path.build.js)))
        .pipe(gulpif(isDev, uglify()))
        .pipe(concat('script.min.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

/*=======================| HTML |=======================*/

function html() {
    return src(path.src.html)
        .pipe(
            plumber({
                errorHandler: notify.onError({
                    message: 'Error: <%= error.message %>',
                    title: 'HTML',
                    sound: false,
                }),
            })
        )
        .pipe(
            fileinclude({
                prefix: '@',
                basepath: '@file',
            })
        )
        .pipe(webpHTML())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

/*=======================| Images |=======================*/

function images() {
    return src([path.src.img, '!.src/img/iconsprite/**'])
        .pipe(changed(path.build.img))
        .pipe(
            webp({
                quality: 75,
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src([path.src.img, '!.src/img/iconsprite/**']))
        .pipe(changed(path.build.img))
        .pipe(
            gulpif(
                isDev,
                imagemin([
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.mozjpeg({ quality: 75, progressive: true }),
                    imagemin.optipng({ optimizationLevel: 3 }),
                    imagemin.svgo({
                        plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
                    }),
                ])
            )
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

/*=======================| SVG |=======================*/

const configsvg = {
    mode: {
        symbol: {
            inline: true,
            sprite: '../icon/sprite.svg',
            example: true,
        },
        css: false, // Create a «css» sprite
        view: false, // Create a «view» sprite
        defs: false, // Create a «defs» sprite
        stack: false, // Create a «stack» sprite
    },
    shape: {
        transform: [
            {
                svgo: {
                    plugins: [
                        {
                            removeAttrs: {
                                attrs: ['class', 'data-name', 'fill*'],
                            },
                        },
                    ],
                },
            },
        ],
    },
}

function svg() {
    return src([source_folder + '/img/iconsprite/*.svg'])
        .pipe(svgSprite(configsvg))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

/*=======================| Fonts |=======================*/

function fonts() {
    src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts))
    return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts))
}

function otf2ttf() {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(
            fonter({
                formats: ['ttf'],
            })
        )
        .pipe(dest(source_folder + '/fonts/'))
}

function checkWeight(fontname) {
    const lowCase = fontname.toLowerCase()
    const fontStyle = {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        extrabold: 800,
        bold: 700,
        heavy: 700,
        black: 900,
    }

    for (let keys of Object.keys(fontStyle)) {
        if (lowCase.indexOf(keys) > -1) {
            if (lowCase.indexOf(keys)) {
                return fontStyle[keys]
            } else {
                return fontStyle[keys]
            }
        }
    }

    return 400
}

function fontsStyle(done) {
    fs.writeFileSync(`${source_folder}/less/include/fonts.less`, '')
    fs.appendFileSync(source_folder + '/less/include/fonts.less', '// main: ./main.less\r\n\n')
    return fs.readdir(path.build.fonts, (err, items) => {
        if (items) {
            let c_fontname
            for (var i = 0; i < items.length; i++) {
                let fontname = items[i].split('.')
                fontname = fontname[0]
                let font = fontname.split(/[-_]/)[0]
                let weight = checkWeight(fontname.split(/[-_]/)[1])
                let style = fontname.split(/[-_]/)[2] || 'normal'
                console.log(`Шрифт ${fontname} готов! - ${font}, ${weight}, ${style}`)

                if (c_fontname != fontname) {
                    fs.appendFile(
                        source_folder + '/less/include/fonts.less',
                        `.font("${font}", "${fontname}", ${weight}, "${style}");\r\n`,
                        done
                    )
                }
                c_fontname = fontname
            }
        }
        done()
    })
}

/*=====================================================*/

function smartGrid(cb) {
    smartgrid(source_folder + '/less/', settings), cb()
}

function watchFiles() {
    watch([path.watch.html], html)
    watch([path.watch.css], css)
    watch([path.watch.js], js)
    watch([path.watch.img], images)
    watch([path.watch.img2], images)
    watch([path.watch.svg], svg)
}

function clear() {
    return del(path.clear)
}

function dev(cb) {
    return (isDev = true), cb()
}

function prod(cb) {
    var files = ['img/symbol', 'js/maps', 'style/maps']
    files.forEach(element => {
        filespath = path.clear + element
        console.log('Удален ' + filespath)
        return del(filespath)
    })
    cb()
    setTimeout(function () {
        src(project_folder + '/**/*.*')
            .pipe(zip(project_folder + '.zip'))
            .pipe(dest('./'))
    }, 500)
    console.log('Релиз проекта ' + project_folder + '.zip' + ' готов!')
}

exports.fontsStyle = fontsStyle
exports.smartGrid = smartGrid
exports.otf2ttf = otf2ttf
exports.fonts = fonts
exports.svg = svg
exports.images = images
exports.html = html
exports.css = css
exports.js = js
exports.watchFiles = watchFiles
exports.browserSync = browserSync

exports.release = series(dev, clear, parallel(html, css, js, images, svg), fonts, fontsStyle, prod)
const build = series(clear, smartGrid, parallel(html, css, js, images, svg), fonts, fontsStyle)
exports.default = series(build, parallel(browserSync, watchFiles))
