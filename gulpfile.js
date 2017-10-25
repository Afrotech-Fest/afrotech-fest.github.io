'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean')

gulp.task('clean', function () {
    return gulp.src('./static/css/*', { read: false })
        .pipe(clean())
})

gulp.task('sass', function () {
    return gulp.src('./static-src/assets/src-sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('default', ['clean', 'sass'])
