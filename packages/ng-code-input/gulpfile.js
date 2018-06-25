var gulp = require('gulp');
var del = require('del');
var gulpsync = require('gulp-sync')(gulp);
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var inject = require('gulp-inject-string');
var $ = require('gulp-load-plugins')();

var jsFilesOrder = [
    'src/app.js',
    'src/scripts/move-next.directive.js',
    'src/scripts/code-input.directive.js',
    'src/scripts/ng-code-input.module.run.js',
]

gulp.task('vet', function () {
    return gulp.src('src/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.size());
});

gulp.task('templateCache', function () {
    return gulp.src('./src/views/**/*.html')
        .pipe(minifyHtml({empty: true}))
        .pipe(templateCache(
            'ng-code-input.module.run.js', {
                module: 'ng-code-input',
                standAlone: false
            }))
        .pipe(gulp.dest('./src/scripts'));
});

gulp.task('optimizeJSFiles', function() {
    return gulp.src(jsFilesOrder)
        .pipe($.concat('ng-code-input.js'))
        .pipe(inject.wrap('(function (){\n\'use strict\';\n', '\n})()'))
        .pipe(gulp.dest('dist'))
        .pipe($.ngAnnotate())
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe($.uglify())
        .on('error', $.notify.onError("Error: <%= error.message %>"))
        .pipe($.rename('ng-code-input.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('clean', function () {
    del('dist/*.*')
});

gulp.task('watch:src', function() {
    gulp.watch('./src/**/*.*',gulpsync.sync(['vet', 'clean', 'templateCache', 'optimizeJSFiles']));
})

gulp.task('build', gulpsync.sync(['vet', 'clean', 'templateCache', 'optimizeJSFiles']));
