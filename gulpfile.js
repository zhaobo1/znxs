var minimist = require('minimist');
var path = require('path');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap');
var args = minimist(process.argv.slice(2));
gulp.task('css-wrap',function(){
    return gulp.src(path.resolve('./src/theme/element-#4056FF/index.css'))
            .pipe(cssWrap({
                selector: '.custom-4056FF' /* 添加的命名空间 */
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('static/css/theme/4056FF')) /* 存放的目录 */
})

//执行命令是gulp css-wrap