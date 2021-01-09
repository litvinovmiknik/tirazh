import gulp from 'gulp';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';

import config from '../config.js';

const src = config.src + '/fonts/**/*.{woff,woff2,ttf,otf,svg,eot}';
const dist = config.dist + '/' + config.assets + '/fonts';

gulp.task('fonts', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src)
            .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
            .pipe(newer(dist))
            .pipe(gulp.dest(dist))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});