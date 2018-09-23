'use strict';

let gulp = require('gulp');

gulp.task('copy-api-folder', function () {
    gulp.src(['api/**']).pipe(gulp.dest('www/api'));
});
