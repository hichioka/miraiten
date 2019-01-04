var path = require('path');
var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var assetsPath = path.resolve(pkg.path.assetsDir);

var gulp = require('gulp');
var sass = require('gulp-sass');// sass compiler
var pug = require('gulp-pug');// pug compiler
var autoprefixer = require('gulp-autoprefixer');// add vender prifix
var plumber = require('gulp-plumber');// error handling
var notify = require("gulp-notify");//error alarm
var browserSync = require("browser-sync");//reflect browser

//setting : paths
var paths = {
  'scss': './src/sass/',
  'css': './dist/css/',
  'pug': './src/pug/',
  'html': './dist/',
  'js': './dist/js/'
}

//setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed'//出力形式
}
//setting : Pug Options
var pugOptions = {
  pretty: true//出力の整形
}

gulp.task('sass', function () {
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(autoprefixer())
    .pipe(sass(sassOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('pug', function() {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.js + "**/*.js", ['reload']);
  gulp.watch(paths.html + "**/*.html", ['reload']);
  gulp.watch(paths.css + "**/*.css", ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

//watch
gulp.task('watch', function () {
  gulp.watch(paths.scss + '**/*.scss', ['scss']);
  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
});
