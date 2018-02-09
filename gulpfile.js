const gulp = require('gulp');
const pump = require('pump');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['serve', 'build'], () => {
  gulp.watch('src/*.js', ['build'], browserSync.reload);
  gulp.watch('examples/*.html').on('change', browserSync.reload);
});

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'examples/index.html',
    },
  });
});

gulp.task('build', (cb) => {
  pump(
    [
      gulp.src('bin/formValidator.js'),
      webpack({
        output: {
          filename: 'form-validator.js',
        },
      }),
      gulp.dest('dist/'),
    ],
    cb,
  );
});

gulp.task('compress', ['build'], (cb) => {
  pump(
    [
      gulp.src('dist/form-validator.js'),
      uglify(),
      rename({ suffix: '.min' }),
      gulp.dest('dist'),
    ],
    cb,
  );
});

gulp.task('babel', (cb) => {
  pump(
    [
      gulp.src('src/*.js'),
      babel(),
      gulp.dest('bin/'),
    ],
    cb,
  );
});
