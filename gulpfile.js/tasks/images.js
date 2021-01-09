import gulp from 'gulp';
import debug from 'gulp-debug';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';

import config from '../config.js';

const src = [
    config.src + '/images/**/*.{png,jpg,jpeg,gif,svg,ico}',
    '!' + config.src + '/images/sprites/**/*.*',
    config.src + '/blocks/**/*.{png,jpg,jpeg,gif,svg,ico}'
];
const dist = config.dist + '/' + config.assets + '/images';

gulp.task('images', (done) => {
    new Promise((resolve, reject) => {
        gulp.src(src)
            .pipe(plumber( {errorHandler: notify.onError("Error: <%= error.message %>")} ))
            .pipe(newer(dist))
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(gulp.dest(dist))
            .pipe(debug())
            .on('end', resolve)
            .on('error', reject)
    });
    done();
});