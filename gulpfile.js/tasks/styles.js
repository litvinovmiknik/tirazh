import gulp from 'gulp';
import sass from 'gulp-sass';
import beautify from 'gulp-jsbeautifier';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';

import config from '../config.js';
import { emitty, state, getFilter } from '../utils.js';

emitty.language({
    extensions: ['.sass', '.scss'],
    parser: require('@emitty/language-scss').parse
});

const src = config.src + '/styles/*.{sass,scss}';
const dist = config.dist + '/' + config.assets + '/styles';
const srcLibs = config.src + '/styles/libs/*.css';
const distLibs = config.dist + '/' + config.assets + '/styles/libs';

gulp.task('styles', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src)
            .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
            .pipe(sass())
            .pipe(postcss( [require('autoprefixer'), require('css-mqpacker')] ))
            .pipe(gulpIf( config.isCssBeautify, beautify() ))
            .pipe(gulpIf( config.isCssBeautify, gulp.dest(dist) ))
            .pipe(gulpIf( config.isCssMinify, cssnano() ))
            .pipe(gulpIf( config.isCssMinify, rename({suffix: '.min'}) ))
            .pipe(gulpIf( config.isCssMinify, gulp.dest(dist) ))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});

gulp.task('styles:libs', (done) => {
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