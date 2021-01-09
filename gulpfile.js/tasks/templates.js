import gulp from 'gulp';
import pug from 'gulp-pug';
import pugbem from 'gulp-pugbem';
import beautify from 'gulp-jsbeautifier';
import gulpIf from 'gulp-if';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import data from 'gulp-data';

import config from '../config.js';
import { emitty, state, getFilter } from '../utils.js';

emitty.language({
    extensions: ['.pug'],
    parser: require('@emitty/language-pug').parse
});

const src = config.src + '/templates/*.pug';
const dist = config.dist;

pugbem.e = config.pugBemEl;
pugbem.m = config.pugBemMod;

gulp.task('templates', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src)
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(gulpIf( state.isWatchMode, getFilter('templates') ))
            .pipe(data( (file) => { return { require: require } } ))
            .pipe(pug({ plugins: [pugbem] }))
            .pipe(gulpIf( config.isHtmlBeautify, beautify() ))
            .pipe(gulp.dest(dist))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});