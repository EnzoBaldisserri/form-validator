/* eslint no-console: off */
const gulp = require('gulp');
const pump = require('pump');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

const { reload } = browserSync;

gulp.task('watch', ['serve'], () => {
  gulp.watch('./src/*.js', ['build']);
  gulp.watch('./examples/*.html').on('change', reload);
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './examples',
    },
  });
});

gulp.task('build', ['babel'], (cb) => {
  pump(
    [
      gulp.src('./bin/*.js'),
      concat('form-validator.js'),
      uglify(),
      gulp.dest('./dist/'),
    ],
    cb,
  );
});

gulp.task('babel', (cb) => {
  pump(
    [
      gulp.src('src/*.js'),
      babel(),
      gulp.dest('bin'),
    ],
    cb,
  );
});
