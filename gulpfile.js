'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var maps = require('gulp-sourcemaps');
var pump = require('pump');
var concat = require('gulp-concat');

gulp.task('script-vendor', function (cb) {
  pump([
      gulp.src('src/vendor/**/*.js'),
      maps.init(),
        concat('vendor.js'),
        uglify(),
      maps.write('.'),
      gulp.dest('./')
    ],
    cb
  );
});

gulp.task('script', function (cb) {
  pump([
      gulp.src('src/js/**/*.js'),
      maps.init(),
        concat('app.js'),
        uglify(),
      maps.write('.'),
      gulp.dest('./')
    ],
    cb
  );
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/app.sass')
  .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix())
  .pipe(maps.write())
  .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./src/vendor/**/*.js', ['script-vendor']);
  gulp.watch('./src/js/**/*.js', ['script']);
  gulp.watch('./src/sass/**/*.{sass,scss}', ['sass']);
});