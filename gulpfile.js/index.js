import './tasks/watch';
import './tasks/build';
import './tasks/serve';

import gulp from 'gulp';

gulp.task('default', gulp.parallel('watch', 'serve'));