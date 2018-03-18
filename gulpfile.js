var gulp = require('gulp');

// copiar o arquivo index.html da pasta app para a pasta build

/**
 * Task HTML
 */
gulp.task('html', function(){
    return gulp.src('app/index.html')
    .pipe(gulp.dest('build/'));
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