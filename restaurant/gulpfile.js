var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('img/*.jpg')
        .pipe(webp())
        .pipe(imagemin({
          progressive: true
        }))
        .pipe(gulp.dest('webp'))
);

gulp.task('image', function(){
  gulp.src('img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'));
})
