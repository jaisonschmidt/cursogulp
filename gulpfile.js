var gulp = require('gulp');

var concat = require('gulp-concat');

// copiar o arquivo index.html da pasta app para a pasta build

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
    return gulp.src('app/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css/'))
});


/**
 * Task watch
 */
gulp.task('watch', function(){
    gulp.watch('app/index.html', ['html']);
});

/**
 * Task Default
 */
gulp.task('default', ['html', 'watch']);