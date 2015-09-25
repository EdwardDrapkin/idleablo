var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;
var plumber = require('gulp-plumber');
var cache = {}, packageCache = {};

var localColors = {
    app: util.colors.green,
    admin: util.colors.magenta,
    error: util.colors.bgRed.bold,
    scss: util.colors.cyan,
    print: util.colors.blue
};

var localPaths = {
    jsInputPath: './source/js/main.js',

    jsOutputPath: './build/js/',
    cssOutputPath: './build/css/',
    sourcemapOutputPath: './build/sourcemaps/'
};

var browserifyOpts = {
    extensions: ['.jsx', '.js'],
    paths: ['./source/js/', '.'],
    cache: cache,
    packageCache: packageCache,
    fullPaths: true,
    debug: true,
    transform: [babelify, reactify],
    verbose: true,
    entries: localPaths.jsInputPath
};

var watchifyOpts = {
    verbose: true,
    debug: true
};
function compress(bundle) {
    return bundle.pipe(uglify({
        compress: true
    }));
}
function appBundle() {
    var b = browserify(browserifyOpts);

    if(argv.watch) {
        b = watchify(b, watchifyOpts);
    }

    if(argv.compressJs) {
        b = compress(b);
    }

    return b
        .on('update', () => {
                appLog("Change event - recompiling bundle.js");
                return appBundle();
            })
        .on('log', appLog)
        .on('error', appLog)
        .bundle()
        .pipe(plumber())
        .pipe(source(localPaths.jsInputPath))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('idleablo.js'))
        .pipe(sourcemaps.write(localPaths.sourcemapOutputPath))
        .pipe(gulp.dest(localPaths.jsOutputPath));
}


function appLog(logLine) {
    return util.log(localColors.app("[bundle.js]"), logLine);
}

/******************************
 * TASKS
 */
gulp.task('app', appBundle);
gulp.task('default', ['app']);