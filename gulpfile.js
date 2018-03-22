var gulp = require('gulp');

var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var cssBeautify = require('gulp-cssbeautify');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var cssReport = require('gulp-csslint-report');

var cssFiles = ['app/css/core.css', 
                'app/css/grid.css', 
                'app/css/components.css'
            ];

/**
 * Task HTML
 */
gulp.task('html', function(){
    return gulp.src('app/index.html')
    .pipe(gulp.dest('build/'));
});

/**
 * CSS
 */
gulp.task('css', function(){

    return gulp.src(cssFiles)
    .pipe(csslint())
    .pipe(cssReport({
        'filename': 'index.html',
        'directory': 'logs/csslint/'
    }))
    .pipe(concat('style.min.css'))
    //.pipe(cleanCSS())
    .pipe(cssBeautify())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css/'))
});


/**
 * Task watch
 */
gulp.task('watch', function(){
    gulp.watch('app/index.html', ['html']);
    gulp.watch('app/css/*.css', ['css']);
});

/**
 * Task Default
 */
gulp.task('default', ['html', 'css', 'watch']);