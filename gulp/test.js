'use strict';

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        js: [
            appRoot + '/nsapi.js',
            appRoot + '/lib/**/*.js',
            appRoot + '/src/**/*.js'
        ]
    };
var defaultTasks = ['env:test', 'test:coverage'];

gulp.task('env:test', function () {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.NODE_ENV = 'test';
    process.env.running_under_istanbul = true;
});

gulp.task('test:coverage', function () {
    let executeTests = function () {
        let path = '/test/**/*-test.js';
        gulp.src([appRoot + path])
            .pipe(plugins.mocha({
                reporters: 'spec'
            }))
            .pipe(plugins.istanbul.writeReports({
                reports: ['lcovonly']
            })); // Creating the reports after tests runned
    };

    // instrumentation nsapi.js
    gulp.src(paths.js)
        .pipe(plugins.istanbul({
            includeUntested: true,
            instrumenter: require('isparta').Instrumenter

        })) // Covering files
        .pipe(plugins.istanbul.hookRequire())// Force `require` to return covered files
        .on('finish', () => executeTests());

});

gulp.task('test', defaultTasks);