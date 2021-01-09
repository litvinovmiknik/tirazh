import './tasks/watch';
import './tasks/build';

import gulp from 'gulp';

gulp.task('default', gulp.parallel('watch'));