var gulp = require('gulp');
var wpPot = require('gulp-wp-pot');

gulp.task('default', function () {
    return gulp.src(['**/*.php'])
        .pipe(wpPot( {
            domain: '<%= name %>'
        } ))
        .pipe(gulp.dest('languages/<%= name %>.pot'));
});