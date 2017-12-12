var gulp = require('gulp')
, minifyCss = require("gulp-minify-css");

gulp.task('minify-css', function () {
    gulp.src('./app/src/css/main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./app/src/css/main-min.css'));
});
