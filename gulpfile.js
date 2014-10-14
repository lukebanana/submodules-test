var gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    shell = require('gulp-shell'),
    plumber = require('gulp-plumber');

//the title that will be used for the notifications
var notifyInfo = {
    title: 'Gulp'
};

// Error Handler
var onError = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        message: "Error: <%= error.message %>"
    })
};

// Compass Activity
function compassWatch(){
    return gulp.src('sass/**/*.scss')
        .pipe(plumber(onError))
        .pipe(shell('compass watch'))
}


// Used to take all JS Files and concat and minify them into one main file
gulp.task('scripts', function(){
    gulp.src(['js/*.js', 'js/custom/*.js'])
        .pipe(plumber(onError))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
    .pipe(gulp.dest('js/min'))
});

gulp.task('compass', compassWatch);

gulp.task('css', function(){
    gulp.watch('sass/*.scss', ['compass']);

});

// Is invoked when there is no other parameter
gulp.task('default', ['scripts', 'css']);