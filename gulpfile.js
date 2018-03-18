var gulp = require('gulp');

var concat = require('gulp-concat');


var cssFiles = ['app/css/core.css', 
                'app/css/grid.css', 
                'app/css/components.css'
            ];

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
    return gulp.src(cssFiles)
    .pipe(concat('style.css'))
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