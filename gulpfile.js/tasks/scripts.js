import path from 'path';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import beautify from 'gulp-jsbeautifier';
import webpack from 'webpack-stream';

import config from '../config.js';
import webpackConfig  from '../../webpack.config.js';

const src = config.src + '/scripts/*.js';
const dist = config.dist + '/' + config.assets + '/scripts';
const srcLibs = config.src + '/scripts/libs/*.js';
const distLibs = config.dist + '/' + config.assets + '/scripts/libs';

webpackConfig.context = path.resolve(__dirname, `../../${config.src}/scripts`);

gulp.task('scripts', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(webpack(webpackConfig))
            .pipe(gulpIf( config.isJsBeautify, beautify() ))
            .pipe(gulpIf( config.isJsBeautify, gulp.dest(dist) ))
            .pipe(gulpIf( config.isJsMinify, uglify() ))
            .pipe(gulpIf( config.isJsMinify, rename({suffix: '.min'}) ))
            .pipe(gulpIf( config.isJsMinify, gulp.dest(dist) ))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});

gulp.task('scripts:libs', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(srcLibs)
            .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
            .pipe(gulp.dest(distLibs))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});