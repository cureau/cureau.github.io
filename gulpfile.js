var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    minifycss   = require('gulp-minify-css'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    cp          = require('child_process'),
    jade        = require('gulp-jade'),
    bourbon     = require('bourbon').includePaths,
    googleWebFonts = require('gulp-google-webfonts');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    var pl = process.platform === "win32" ? "jekyll.bat" : "jekyll";
    return cp.spawn(pl, ['build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});


gulp.task('gfonts', function () {
    return gulp.src('./fonts.list')
        .pipe(googleWebFonts({
            fontsDir: '../../fonts/GoogleFonts',
            cssDir: '',
            cssFilename: '_gfonts.scss'
        }))
        .pipe(gulp.dest('css/utils/'))
        .pipe(gulp.dest('_site/css/utils/'));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(sass({
            includePaths: [bourbon],
            onError: browserSync.notify
        }).on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}));
});


/**
 * Compile Jade
 */
gulp.task('jade', function() {
    return gulp.src('_jade/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('_includes'));
});


/*
** JS Task
*/
gulp.task('js', function() {
  return gulp.src('js/common.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('common.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(gulp.dest('_site/js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['js']).on("change", browserSync.reload);
    gulp.watch('css/**', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['jekyll-rebuild']);
    gulp.watch('_jade/**/*', ['jade']);
    gulp.watch('fonts.list', ['gfonts']).on("change", browserSync.reload);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
