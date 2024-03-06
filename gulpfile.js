// gulp 및 패키지 모듈 호출
const gulp        = require('gulp');
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const sass        = require('gulp-sass')(require('sass'));
const cleanCss    = require("gulp-clean-css"); // css minimalize
const watch       = require('gulp-watch');
const webserver   = require('gulp-webserver');
const ghPages     = require('gulp-gh-pages');
const cleanDeploy = function() { del([".publish"]); }


/**
 * =====================================+
 * @task : HTML
 * =====================================+
 */
gulp.task('html', function () {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist')) //dist 폴더에 저장
});


/**
 * =====================================+
 * @task : Script 병합,압축,min 파일 생성
 * =====================================+
 */
gulp.task('js', function () {
    return gulp
        .src('src/js/*.js', { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist/js', { sourcemaps: true }))
});


/**
 * ==============================+
 * @SCSS : SCSS Config(환경설정)
 * ==============================+
 */
var scssOptions = {
    outputStyle : "expanded",
    indentType : "tab",
    indentWidth : 1,
    precision: 3,
    sourceComments: false
};

/**
 * ==================================+
 * @task : SCSS Compile & sourcemaps
 * ==================================+
 */
gulp.task('scss', function () {
    return gulp
        .src('src/scss/*.scss', { sourcemaps: true })
        .pipe(sass(scssOptions).on('error', sass.logError))
        .pipe(cleanCss({ compatibiliy: 'ie8' }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css', { sourcemaps: true }))
});


/**
 * =====================================+
 * @task : Images
 * =====================================+
 */
gulp.task('images', function () {
    return gulp
        .src('src/images/*.{svg,jpeg,jpg,png,gif}')
        .pipe(gulp.dest('dist/images')) //dist 폴더에 저장
});


/**
 * =====================================+
 * @task : Images:portfolio
 * =====================================+
 */
gulp.task('images:portfolio', function () {
    return gulp
        .src('src/images/portfolio/*.{svg,jpeg,jpg,png,gif}')
        .pipe(gulp.dest('dist/images/portfolio')) //dist 폴더에 저장
});


/**
 * =====================================+
 * @task : Fonts
 * =====================================+
 */
gulp.task('fonts', function () {
    return gulp
        .src('src/fonts/*.{woff,woff2,ttf,otf,svg}')
        .pipe(gulp.dest('dist/fonts')) //dist 폴더에 저장
});


/**
 * =====================================+
 * @task : Webserver
 * =====================================+
 */
gulp.task('webserver', function() {
    gulp.src('dist')
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
    }));
});


/**
 * =====================================+
 * @task : watch로 파일변경 감지
 * =====================================+
 */
gulp.task('watch', function () {
    gulp.watch('./src/fonts/*.{woff,woff2,ttf,otf,svg}', gulp.series(['fonts'])); 
    gulp.watch('./src/images/*.{svg,jpeg,jpg,png,gif}', gulp.series(['images'])); 
    gulp.watch('./src/images/portfolio/*.{svg,jpeg,jpg,png,gif}', gulp.series(['images:portfolio'])); 
    gulp.watch('./src/js/*.js', gulp.series(['js'])); 
    gulp.watch('./src/scss/*.scss', gulp.series(['scss'])); 
    gulp.watch('./src/*.html', gulp.series(['html'])); 
});

/**
 * =====================================+
 * @task : watch로 파일변경 감지
 * =====================================+
 */
gulp.task('gh', function() {
    return gulp.src("dist/**/*")
    .pipe(ghPages(
        // { branch: "view-pages" }     // 옵션을 설정하지 않으면 자동으로 gh-pages 브랜치를 생성하고 배포 (브랜치명 변경 시 사용)
    ));
})


/**
 * ==============================+
 * @task : gulp default
 * ==============================+
 */
gulp.task('default', gulp.series([gulp.parallel(['watch','webserver'])]));


/**
 * ==============================+
 * @task : gulp Export
 * ==============================+
 */
export const build = gulp.series([ prepare, assets ]);  // gulp build 실행 (prepare 실행 후 assets 실행) - build만 실행
export const dev = gulp.series([ build, live ]);// gulp dev 실행 (build 실행 후 live 실행) - build 실행 후 live 실행
export const deploy = gulp.series([ gh, cleanDeploy ]); // gulp deploy 실행 (현재 dist 폴더를 배포할 경우 첫째 줄 사용, src를 한 번 더 빌드 하여 배포할 경우 둘째 줄 사용)