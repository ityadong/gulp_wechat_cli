let gulp = require('gulp');
let gulpSequence = require('gulp-sequence');//按指定顺序运行一系列gulp任务
let rename = require('gulp-rename'); //对改变之后的文件重命名
let clear = require('del'); //清除文件 的插件
let copyhtml = require('gulp-htmlmin'); //删除所有空白和注释，生成新的文件
let uglify = require('gulp-uglify'); //压缩js的插件
let uglifyCss = require('gulp-uglifycss'); //压缩css的插件
let cssSwitchScss = require('gulp-css-scss'); //将css文件转换成scss文件
let scss = require('gulp-scss'); //将scss文件编译成css
let px2rpx = require('postcss-px2rpx');
let autoprefixer = require('gulp-autoprefixer'); //为css增加前缀 自动化处理css前缀
let babel = require('gulp-babel'); //将es6 转换成 es5
let px2rem = require('gulp-px2rem'); //将css文件的 px 转换成rem（1rem = 16px）
let postCss = require('gulp-postcss');
let sourcemaps = require('gulp-sourcemaps');

/** 解释：
gulp.task(name, fn) - 定义任务，第一个参数是任务名，第二个参数是任务内容。
gulp.src(path) - 选择文件，传入参数是文件路径。
gulp.dest(path) - 输出文件
gulp.pipe() - 管道，你可以暂时将 pipe 理解为将操作加入执行队列 **/

// 在命令行使用 gulp js 启动此任务
// DEMO
/* gulp.task('js',()=>{
    // 1. 找到文件
    gulp.src('client/js/jquery.js')
    // 2. 压缩文件
        .pipe(uglify())
    // 3. 压缩后要存放的文件夹
        .pipe(gulp.dest('dist/js'))
}); */



let client = './client';
let dist = './dist';


/*gulp.task('wxml',()=>{
    gulp.src(`${client}/!**!/!*.wxml`)
        .pipe(copyhtml({
            collapseWhitespace: false, //wxml 代码压缩
            removeComments: true,
            keepClosingSlash: true
        }))
        .pipe(gulp.dest(dist))
});*/

gulp.task('wxml', () => {
    return gulp
        .src(`${client}/**/*.wxml`)
        .pipe(gulp.dest(dist))
});

/** 生成map；将es6的写法 转换成es5； **/
//生成sourcemap文件,简单讲就是文件压缩后不利于查看与调试，但是有了sourcemap，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
gulp.task('js',()=>{
    gulp.src('client/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist))
});

/** 将px转换成 rpx  **/
gulp.task('wxss',()=>{
    gulp.src(`${client}/**/*.scss`)
        .pipe(scss())
        .pipe(postCss([px2rpx()]))
        .pipe(rename({
            extname : '.wxss'
        }))
        .pipe(gulp.dest(dist))
});

/** 将client 下的 json 复制到 dist目录目录下  **/
gulp.task('json',()=>{
    gulp.src(`${client}/**/*.json`)
        .pipe(gulp.dest(dist))
});

gulp.task('wxs',()=>{
    gulp.src('client/**/*.wxs')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename({
            extname : '.wxs'
        }))
        .pipe(gulp.dest(dist))
});

/** 将client 下的 图片复制到 dist目录目录下 **/
gulp.task('img',()=>{
   return gulp.src(`${client}/img/*`)
       .pipe(gulp.dest(dist+'/img/'))
});

/** 监听到文件变化，进行编译 **/
gulp.task('watch',()=>{
    //参数1 文件路径 ,参数2 监听文件变化之后要执行的任务
    gulp.watch(`${client}/**/*.scss`,['wxss']);
    gulp.watch(`${client}/**/*.js`,['js']);
    gulp.watch(`${client}/**/*.json`,['json']);
    gulp.watch(`${client}/**/*.wxml`,['wxml']);
    gulp.watch(`${client}/**/*.wxs`,['wxs']);
    gulp.watch(`${client}/img/*`,['img']);
});

/** 删除dist 目录下的所有文件 **/
gulp.task('clear',()=>{
   clear([`${dist}`])
       .then(res=>{
           console.log('clear away success -.- -.- -.-')
       })
});

/** 按一定顺序执行gulp任务 **/

gulp.task('dev',gulpSequence('clear','wxml','js','json','wxss','wxs','img','watch'));

gulp.task('build',gulpSequence('clear','wxml','js','json','wxs','wxss'));



