var gulp = require('gulp');

var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var cssBeautify = require('gulp-cssbeautify');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var cssReport = require('gulp-csslint-report');
var sass = require('gulp-sass');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require("gulp-jshint");
var typescript = require('gulp-typescript');
var htmlBeautify =  require('gulp-html-beautify');
var htmlMin = require('gulp-htmlmin');
var imageMin = require('gulp-imagemin');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var cssFiles = ['app/css/core.css', 
                'app/css/grid.css', 
                'app/css/components.css'
            ];

var jsFiles = [
                'app/javascript/core.js',
                'app/javascript/header.js',
                'app/javascript/footer.js'
            ];

/**
 * Limpar imagens
 */
gulp.task('clean-img', function(){
    return gulp.src('build/img/**/*')
           .pipe(clean());
});

/**
 * Task de imagens
 */
gulp.task('img', ['clean-img'], function(){
    return gulp.src('app/images/**/*')
           .pipe(imageMin())
           .pipe(gulp.dest('build/img/'));
});

/**
 * Task HTML
 */
gulp.task('html', function(){
    return gulp.src('app/template/**/*.html')
           .pipe(plumber())
           //.pipe(htmlBeautify())
           .pipe(htmlMin({collapseWhitespace: true}))
           .pipe(gulp.dest('build/'));
});

/**
 * CSS
 */
gulp.task('css', function(){

    return gulp.src(cssFiles)
    .pipe(plumber())
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
 * Sass - Dev
 */
gulp.task('sassDev', function(){
    return gulp.src('app/scss/style-sass.scss')
           .pipe(sass().on('error', sass.logError))
           .pipe(gulp.dest('build/css'));
});

/**
 * Sass - Prod
 */
gulp.task('sassProd', function(){
    return gulp.src('app/scss/style-sass.scss')
           .pipe(sass({ outputStyle : "compressed" }).on('error', sass.logError))
           .pipe(rename('style-sass.min.css'))
           .pipe(gulp.dest('build/css'));
});

/**
 * Less
 */
gulp.task('less', function(){
    return gulp.src('app/less/*.less')
           .pipe(less())
           .pipe(gulp.dest('build/css'));
});

/**
 * Task de JavaScript
 */
gulp.task('js', function(){
    return gulp.src(jsFiles)
           .pipe(plumber())
           .pipe(jshint())
           .pipe(jshint.reporter('jshint-stylish')) 
           .pipe(sourcemaps.init())
            .pipe(concat('script.min.js'))
            .pipe(uglify())
           .pipe(sourcemaps.write('.')) 
           .pipe(gulp.dest('build/js'))
});

/** 
 * typescript 
 * */

 gulp.task('ts', function(){
     return gulp.src('app/typescript/script.ts')
            .pipe(typescript({
                outFile : 'script-ts.js'
            }))
            .pipe(gulp.dest('build/js'))

 });

/**
 * Task watch
 */
gulp.task('watch', function(){

    browserSync.init({
        server: './build'
    });

    gulp.watch('app/template/**/*.html', ['html']).on('change', browserSync.reload);
    gulp.watch('app/css/*.css', ['css']).on('change', browserSync.reload);
    gulp.watch(jsFiles, ['js']).on('change', browserSync.reload);
});

/**
 * Task Default
 */
gulp.task('default', ['html', 'css', 'js', 'watch']);