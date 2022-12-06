import imagemin from 'gulp-imagemin';
import gulp from "gulp";
import uglify from 'gulp-uglify';
import webserver from "gulp-webserver";
import cleanCss from 'gulp-clean-css';
import { create } from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// minify js file
gulp.task('minifyjs', () => {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(create().stream())
});

// minify image
gulp.task('imagemin', () => {
    return gulp.src('image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/image'))
});

// complie SCSS
gulp.task('sass', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('app/css'))
        .pipe(create().stream())
})

// webserver
gulp.task('webserver', () => {
    return gulp.src('app')
        .pipe(webserver({
            port: 3000,
            livereload: true,
            open: true
        }))
})

// watch file
gulp.task('watch', () => {
    gulp.watch('./app/index.html').on('change', create().reload)
    gulp.watch('./src/*.js', gulp.series('minifyjs'))
    gulp.watch('./scss/*.scss', gulp.series('sass'))
    gulp.watch('./image/*', gulp.series('imagemin'))
})




// gulp3
// gulp.task('default', ['minifyjs'], function() {....} );

// Default task (gulp 4)
gulp.task('default', gulp.series('imagemin', 'watch', ))
