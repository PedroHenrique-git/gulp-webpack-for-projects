const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass')); 
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();
const webpackConfig = require('./webpack.config');

sass.compiler = require('node-sass');

const paths = {
    sass: {
        src: './src/sass/**/*.scss',
        dest: './public/assets/css/'
    },
    js: {
        src: './src/**/*.js',
        dest: './public/assets/js'
    }
};

const transpileSass = () => {
    return gulp.src(paths.sass.src)
           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
           .pipe(gulp.dest(paths.sass.dest))
           .pipe(browserSync.stream());
};

const jsWebpack = (cb) => {
    return webpack(webpackConfig)
           .pipe(gulp.dest(paths.js.dest))
           .pipe(browserSync.stream());
};

const server = () => {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });

    gulp.watch(paths.js.src, jsWebpack);
    gulp.watch(paths.sass.src, transpileSass);
    gulp.watch(paths.sass.src).on('change', browserSync.reload);
    gulp.watch(paths.js.src).on('change', browserSync.reload);
};

exports.default = server; 