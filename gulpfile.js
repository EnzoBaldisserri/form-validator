/* eslint no-console: off */
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('watch', () => {
  const watcher = gulp.watch('src/**/*.js', ['babel']);
  watcher.on('change', event =>
    console.log(`File ${event.path} was ${event.type}`));
});

gulp.task('babel', () =>
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('bin')));
