const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('dev', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets'))
});

gulp.task('build', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets'))
});

gulp.task('watch', function () {
  gulp.watch('styles/**/*.scss', gulp.series('dev'));
})