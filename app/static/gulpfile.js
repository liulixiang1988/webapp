'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    minifyCss = require('gulp-minify-css'),
    maps = require('gulp-sourcemaps'),
    del = require('del');

//编译JavaScript
gulp.task('concatScripts', function() {
    return gulp.src([
            'js/jquery-1.11.3.min.js',
            'js/bootstrap.min.js',
            'js/main.js'
        ])
        .pipe(maps.init())
        .pipe(concat("app.js"))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));
});

//压缩JavaScript
gulp.task('minifyScripts', ['concatScripts'], function() {
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

//编译SASS
gulp.task('compileSass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'scss',
            sourcemap: true
        }))
        .pipe(gulp.dest('css'));
});

//压缩CSS
gulp.task('minifyCss', ['compileSass'], function(){
    return gulp.src("css/styles.css")
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('css'));
});

//监视
gulp.task('watchFiles', function() {
    gulp.watch(['scss/**/*.scss', 'scss/*.scss'], ['compileSass']);
    gulp.watch('js/main.js', ['concatScripts']);
});

//清理
gulp.task('clean', function() {
    del(['dist', 'css/styles*.css*', 'js/app*.js*']);
});

//构建
gulp.task('build', ["minifyScripts", "minifyCss"], function() {
    // gulp.src(["css/styles.min.css",
    //         "js/app.min.js",
    //         "index.html",
    //         "img/**",
    //         "fonts/**"
    //     ], {
    //         base: './'
    //     })
    //     .pipe(gulp.dest('dist'))
});

//服务
gulp.task('serve', ['watchFiles']);

//默认任务
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});