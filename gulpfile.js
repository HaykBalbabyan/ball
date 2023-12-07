const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');
const terserOptions = require('./terser-options');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');
const del = require('del');

function clean() {
    return del(['public/**/*','esp/**/*']);
}

function html() {
    return gulp
        .src(['resources/**/*.html','!resources/esp/**/*.*'])
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
        .src(['resources/**/*.css','!resources/esp/**/*.*'])
        .pipe(cleanCSS())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(replace('-webkit-box-orient', 'box-orient'))
        .pipe(cssnano(({zindex: false})))
        .pipe(replace('box-orient', '-webkit-box-orient'))
        .pipe(gulp.dest('public/css'));
}

function js() {
    return gulp
        .src(['resources/**/*.js','!resources/esp/**/*.*'])
        .pipe(uglify())
        .pipe(terser(terserOptions))
        .pipe(gulp.dest('public/'));
}

function rest() {
    return gulp
        .src(['resources/**/*', '!resources/**/*.html', '!resources/**/*.css', '!resources/**/*.js','!resources/esp/**/*.*'])
        .pipe(gulp.dest('public/'));
}

function esp() {
    return gulp
        .src('resources/esp/**/*.html')
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
        .pipe(replace('"','\\"'))
        .pipe(gulp.dest('public/esp/'));
}

function watch() {
    gulp.watch('resources/**/*.html', html);
    gulp.watch('resources/**/*.css', css);
    gulp.watch('resources/**/*.js', js);
    gulp.watch('resources/esp/**/*.js', esp);
    gulp.watch(['resources/**/*', '!resources/**/*.html', '!resources/**/*.css', '!resources/**/*.js'], rest);
}

const build = gulp.series(clean, gulp.parallel(esp, html, css, js, rest));

// Exports
exports.html = html;
exports.css = css;
exports.js = js;
exports.rest = rest;
exports.watch = watch;
exports.esp = esp;
exports.clean = clean;

exports.default = gulp.series(gulp.parallel(esp, html, css, js, rest), watch);
exports.build = build;