'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') 
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: 'app'
      },
    })
  })


gulp.task('watch', gulp.series(['browserSync']), async function(){
    // gulp.watch('app/scss/**/*.scss', ['sass']); 
    // Other watchers
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
})

gulp.task('default', gulp.series(['watch']) , async function () {    
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch((['browserSync', 'sass', 'watch'])); 
});