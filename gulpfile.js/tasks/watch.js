import './templates';
import './styles';
import './scripts';
import './images';
import './sprites';
import './fonts';

import gulp from 'gulp';

import config from '../config.js';
import { state } from '../utils.js';

const templatesWatch = config.src + '/**/*.pug';
const stylesWatch = config.src + '/**/*.{sass,scss}';
const stylesLibsWatch = config.src + '/styles/libs/**/*.css';
const scriptsWatch = [
    config.src + '/**/*.js',
    '!' + config.src + '/scripts/libs/**/*.js'
];
const scriptsLibsWatch = config.src + '/scripts/libs/**/*.js';
const imagesWatch = [
    config.src + '/**/*.{png,jpg,jpeg,gif,svg,ico}',
    '!' + config.src + '/images/sprites/**/*.*'
];
const spritesPngWatch = config.src + '/images/sprites/png/*.png';
const fontsWatch = config.src + '/fonts/**/*.{woff,woff2,ttf,otf,svg,eot}';

gulp.task('watch:init', (done) => {
    state.isWatchMode = true;
    done();
});

gulp.task('watch:templates', () => {
    gulp.watch(templatesWatch, gulp.series('templates'))
        .on('all', (event, changed) => {
            state.watch.templates = changed;
        })
});

gulp.task('watch:styles', () => {
    gulp.watch(stylesWatch, gulp.series('styles'))
        .on('all', (event, changed) => {
            state.watch.styles = changed;
        })
});

gulp.task('watch:stylesLibs', () => {
    gulp.watch(stylesLibsWatch, gulp.series('styles:libs'))
        .on('all', (event, changed) => {
            state.watch.stylesLibs = changed;
        })
});

gulp.task('watch:scripts', () => {
    gulp.watch(scriptsWatch, gulp.series('scripts'))
        .on('all', (event, changed) => {
            state.watch.scripts = changed;
        })
});

gulp.task('watch:scriptsLibs', () => {
    gulp.watch(scriptsLibsWatch, gulp.series('scripts:libs'))
        .on('all', (event, changed) => {
            state.watch.scriptsLibs = changed;
        })
});

gulp.task('watch:images', () => {
    gulp.watch(imagesWatch, gulp.series('images'))
        .on('all', (event, changed) => {
            state.watch.images = changed;
        })
});

gulp.task('watch:spritesPng', () => {
    gulp.watch(spritesPngWatch, gulp.series('sprites:png'))
        .on('all', (event, changed) => {
            state.watch.spritesPng = changed;
        })
});

gulp.task('watch:fonts', () => {
    gulp.watch(fontsWatch, gulp.series('fonts'))
        .on('all', (event, changed) => {
            state.watch.fonts = changed;
        })
});

gulp.task('watch', gulp.series(
    'watch:init',
    gulp.parallel(
        'templates', 
        'styles', 
        'styles:libs', 
        'scripts', 
        'scripts:libs', 
        'images', 
        'sprites:png', 
        'fonts'
    ),
    gulp.parallel(
        'watch:templates', 
        'watch:styles', 
        'watch:stylesLibs', 
        'watch:scripts', 
        'watch:scriptsLibs', 
        'watch:images', 
        'watch:spritesPng', 
        'watch:fonts'
    )
));