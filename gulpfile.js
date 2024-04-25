'use strict';

const { src, dest, series, parallel, watch } = require('gulp');

const
  sass = require('gulp-sass')(require('sass')),
  uglify = require('gulp-uglify');

const
  scssPath = 'assets-dev/scss/**/*.scss',
  jsPath = 'assets-dev/js/**/*.js';

const cssTask = function () {
  return src(scssPath)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('assets'));
};

const jsTask = function () {
  return src(jsPath)
    .pipe(uglify())
    .pipe(dest('assets'));
};

const watchTask = function () {
  watch(scssPath, series(cssTask));
  watch(jsPath, series(jsTask));
}

exports.watch = series(parallel(cssTask, jsTask), watchTask);
exports.build = parallel(cssTask, jsTask);
