const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// Paths
const paths = {
    html: 'dev/html/index.html',
    styles: 'dev/css/style.css',
    scripts: 'dev/js/app.js',
};

// Lint HTML
function lintHTML() {
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist'));
}

// Compile and minify CSS
function styles() {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
}

// Lint JavaScript
function lintJS() {
    return gulp.src(paths.scripts)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Transpile and bundle JavaScript
function scripts() {
    return gulp.src(paths.scripts)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
}

// Watch for changes
function watch() {
    gulp.watch(paths.html, lintHTML);
    gulp.watch(paths.styles, styles);
    gulp.watch(paths.scripts, lintJS, scripts);
}

exports.default = gulp.series(gulp.parallel(lintHTML, styles, lintJS, scripts), watch);
exports.build = gulp.series(gulp.parallel(lintHTML, styles, lintJS, scripts));
