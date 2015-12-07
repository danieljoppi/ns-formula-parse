'use strict'
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    through = require('through'),
    plugins = gulpLoadPlugins(),
    appRoot = process.cwd(),
    paths = {
        js: [
            appRoot + '/nsapi.js',
            appRoot + '/lib/**/*.js',
            appRoot + '/src/**/*.js'
        ],
        jsTests: [appRoot + '/test/**/*-test.js']
    };

var defaultTasks = ['env:development', 'dev:mocha', 'watch'];

gulp.task('env:development', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('dev:mocha', function () {
    return gulp.src(paths.jsTests)
        .pipe(plugins.plumber())
        .pipe(plugins.mocha({
            reporters: 'spec'
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.js.concat(paths.jsTests), ['dev:mocha'])
        .on('error', e => console.error(e));
});

gulp.task('development', defaultTasks);