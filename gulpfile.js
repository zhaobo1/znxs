var minimist = require('minimist');
var path = require('path');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap');
var rename = require('gulp-rename');
var args = minimist(process.argv.slice(2));
console.log(args)
gulp.task('css-wrap',function(){
    return gulp.src(path.resolve('./src/theme/element-#FF40B6/index.css'))
            .pipe(cssWrap({
                selector: '.custom-FF40B6' /* 添加的命名空间 */
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('static/css/theme/FF40B6')) /* 存放的目录 */
})
gulp.task('move', function() {
    return gulp.src(
        ['./**/**/element-#FF40B6/**/*ttf','./**/**/element-#FF40B6/**/*woff'], {
            base: './'   //如果设置为 base: 'js' 将只会复制 js目录下文件, 其他文件会忽略
        }
    ).pipe(rename({dirname: 'fonts/'}))  
    .pipe(gulp.dest('static/css/theme/FF40B6'));
});

//执行命令是gulp css-wrap