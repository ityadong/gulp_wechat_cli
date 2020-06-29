let gulp = require('gulp');
let rename = require('gulp-rename'); //对改变之后的文件重命名
let clean = require('gulp-clean'); //清除文件 的插件
let scss = require('gulp-scss'); //将scss文件编译成css
let px2rpx = require('postcss-px2rpx');
let autoprefixer = require('gulp-autoprefixer'); //为css增加前缀 自动化处理css前缀
let babel = require('gulp-babel'); //将es6 转换成 es5
let px2rem = require('gulp-px2rem'); //将css文件的 px 转换成rem（1rem = 16px）
let postCss = require('gulp-postcss');

/** 解释：
 gulp.src(path) - 选择文件，传入参数是文件路径。
 gulp.dest(path) - 输出文件
 gulp.pipe() - 管道，你可以暂时将 pipe 理解为将操作加入执行队列
 gulp.series() - 将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。
 **/

let client = './client';
let dist = './dist';

function wxmlTask() {
    return gulp.src(`${client}/**/*.wxml`)
        .pipe(gulp.dest(dist))
}

/** 生成map；将es6的写法 转换成es5； **/
//生成sourcemap文件,简单讲就是文件压缩后不利于查看与调试，但是有了sourcemap，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
function jsTask() {
    return gulp.src(`${client}/**/*.js`)
        .pipe(gulp.dest(dist))
}

/** 将px转换成 rpx  **/
function scssTask() {
    return gulp.src(`${client}/**/*.scss`)
        .pipe(scss())
        .pipe(postCss([px2rpx()]))
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest(dist))
}

/** 不处理wxss，直接复制过去 **/
function wxssTask() {
    return gulp.src(`${client}/**/*.wxss`)
        .pipe(gulp.dest(dist))
}

/** 将client 下的 json 复制到 dist目录目录下  **/
function jsonTask() {
    return gulp.src(`${client}/**/*.json`)
        .pipe(gulp.dest(dist))
}

function wxsTask() {
    return gulp.src(`${client}/**/*.wxs`)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename({
            extname: '.wxs'
        }))
        .pipe(gulp.dest(dist))
}

/** 将client 下的 图片复制到 dist目录目录下 **/
function imgTask() {
    return gulp.src(`${client}/img/*`)
        .pipe(gulp.dest(dist + '/img/'))
}

/** 删除dist 目录下的所有文件 **/
function clearTask() {
    return gulp.src(dist, {read: false})
        .pipe(clean())
}

/** 监听文件变化的操作,进行编译 **/
function watchTask(cb) {
    gulp.watch([`${client}/**/*.wxml`], {delay: 1000}, wxmlTask);
    gulp.watch([`${client}/**/*.scss`], {delay: 1000}, scssTask);
    gulp.watch([`${client}/**/*.js`], {delay: 1000}, jsTask);
    gulp.watch([`${client}/**/*.wxss`], {delay: 1000}, wxssTask);
    gulp.watch([`${client}/**/*.wxs`], {delay: 1000}, wxsTask);
    gulp.watch([`${client}/img/*`], {delay: 1000}, imgTask);
}

/** 按一定顺序执行gulp任务 **/
// 打包
exports.build = gulp.series(clearTask, wxmlTask, jsTask, jsonTask, wxssTask, scssTask, wxsTask, imgTask)

// 监听文件变化之后运行
exports.watch = watchTask



