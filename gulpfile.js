var gulp = require('gulp');
//var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass')
var uglifycss = require('gulp-uglifycss');
var csscomb = require('gulp-csscomb');
var autoprefixer = require('gulp-autoprefixer');

var uglyfly = require('gulp-uglyfly');

var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync').create();

//1. less -> css   编译   "合并"  压缩 
gulp.task('style',function(){
    gulp.src(['master/scss/*.scss','!master/scss/_*.scss'])          //入口文件  要处理哪里的文件
        .pipe(sass())           //编译
        .pipe(csscomb())        //css格式化
        .pipe(autoprefixer({    //处理兼容, 加前缀
            browsers: [
                'Android 2.3',
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24', // Firefox 24 is the latest ESR 
                'Explorer >= 8',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6'
            ],
            cascade: false
        }))
        .pipe(uglifycss({"uglyComments": false}))      //压缩
        .pipe(gulp.dest('public/css'))    //通过pipe管道  指定出口文件  处理完的文件放到哪儿
});

//2. js合并  压缩  混淆
gulp.task('script',function(){
    gulp.src('master/scripts/*.js')
        //.pipe(concat('main.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('public/js'))
})

//3. 图片复制
gulp.task('image',function(){
    gulp.src('master/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
});

//5. 热更新
var reload = browserSync.reload;
gulp.task('server',function(){
    browserSync.init({
        proxy: "127.0.0.1:3000"
    });
    gulp.watch('master/scss/*.scss',['style']).on('change',reload);
    gulp.watch('master/scripts/*.js',['script']).on('change',reload);
    gulp.watch('master/img/*.*',['image']).on('change',reload);
    gulp.watch(["views/**/*","app.js"]).on("change",reload);
})

