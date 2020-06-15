const {src,dest,watch} = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  cleanCSS = require( 'gulp-clean-css'),
  rename = require("gulp-rename");

  function bs() {
    serveSass()
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
    watch("./app/*.html").on('change', browserSync.reload);
    watch("./app/sass/**/*.sass", serveSass);
    watch("./app/sass/**/*.scss", serveSass);
    watch("./app/js/*.js").on('change', browserSync.reload);

};

function serveSass() {
   return src('./app/sass/**/*.sass', './app/sass/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
};

exports.serve = bs;
exports.default = this.serve; 