const gulp = require('gulp');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    
    gulp.watch("src/*.html").on('change', browserSync.reload)
});

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({prefix: "", suffix: ".min",}))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());

});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});
gulp.task('html', function() {
    return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task('font', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function() {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});

gulp.task('images', function() {
    return gulp.src("src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

gulp.task('backgrounds', function() {
    return gulp.src("src/background/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/background"));
});

gulp.task('logo', function() {
    return gulp.src("src/logo/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/logo"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'font', 'icons', 'html', 'images', 'backgrounds', 'logo'));