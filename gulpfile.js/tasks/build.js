import './templates';
import './styles';
import './scripts';
import './images';
import './sprites';
import './fonts';

import gulp from 'gulp';

gulp.task('build', gulp.parallel(
    'templates',
    'styles',
    'styles:libs',
    'scripts',
    'scripts:libs',
    'images',
    'sprites:png',
    'fonts'
));