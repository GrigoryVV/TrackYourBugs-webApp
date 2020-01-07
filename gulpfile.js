const gulp = require('gulp');
const uglifyJS = require('gulp-terser');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('buildjs', function() {
    return gulp.src('script/index/*.js')
        .pipe(uglifyJS())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('buildcss', function() {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'));
});