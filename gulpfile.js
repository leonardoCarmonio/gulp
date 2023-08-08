var gulp = require('gulp');
var html = require('gulp-htmlmin');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

gulp.task('html', () => {
    return gulp.src('./src/index.html')
    .pipe(html({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
    return gulp.src('./src/scss/style.scss')
    .pipe(sass({outputStyle: "compressed"}))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });

    gulp.watch('./src/index.html', gulp.series('html'));
    gulp.watch('./src/scss/style.scss/', gulp.series('sass'));
    
});

gulp.task('default', gulp.series('html','sass','bs'), () => {});





