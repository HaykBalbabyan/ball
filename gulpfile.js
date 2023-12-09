const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');
const del = require('del');
const terser = require('gulp-terser');

const webpack = require('webpack-stream');

function clean() {
    return del(['public/**/*']);
}

let env = 'production';

function html() {
    return gulp
        .src(['resources/html/*.html'])
        .pipe(fileInclude({
            prefix: '{{',
            suffix: '}}',
            basepath: '@file'
        }))
        .pipe(htmlclean())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
        }))
        .pipe(gulp.dest('public/'));
}

function css() {
    return gulp
        .src(['resources/scss/*.css'])
        .pipe(cleanCSS())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(replace('-webkit-box-orient', 'box-orient'))
        .pipe(cssnano(({zindex: false})))
        .pipe(replace('box-orient', '-webkit-box-orient'))
        .pipe(gulp.dest('public/css'));
}

function js() {
    let g = gulp
        .src(['resources/js/*.js','!resources/js/*.js.map'])
        .pipe(webpack(require('./webpack.config.js')(env), require('webpack')));

    if(env === 'production'){
        g = g.pipe(terser(require('./terser-options')))
    }

    g = g.pipe(gulp.dest('public/js'));

    return g;
}

function watch() {
    gulp.watch('resources/**/*.html', html);
    gulp.watch('resources/**/*.css', css);
    gulp.watch('resources/**/*.js', js);
    gulp.watch('dynamic-js/**/*.js', js);
}

function __default(done){
    env = 'development';
    done();
}

function __build(done){
    env = 'production';
    done();
}

// Exports
exports.html = html;
exports.css = css;
exports.js = js;
exports.watch = watch;
exports.clean = clean;

exports.default = gulp.series(
    __default,
    clean,
    gulp.parallel(
        html,
        css,
        js
    ),
    watch
);

exports.build = gulp.series(
    __build,
    clean,
    gulp.parallel(
        html,
        css,
        js
    )
);