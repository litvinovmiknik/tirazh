import gulp from 'gulp';
import browserSync from 'browser-sync';

import config from '../config.js';

const dist = config.dist;
const distWatch = config.dist + '/**/*.*';

browserSync.create();

gulp.task('serve', () => {
    browserSync.init({
        server: dist
    });
    browserSync.watch(distWatch).on('change', browserSync.reload);
});