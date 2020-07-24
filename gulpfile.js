// 引入模块
const gulp = require('gulp')
const uglify = require('gulp-uglify');          // 压缩JS
const babel = require('gulp-babel');            // 解决ES6兼容
const rev = require('gulp-rev');                // 使用MD5算法加后缀
const revCollector = require('gulp-rev-collector'); // 根据JSON数据替换HTML路径
const cssmin = require('gulp-minify-css');      // 压缩CSS
const imagemin = require('gulp-imagemin');      // 压缩IMG
const minifyHtml = require('gulp-minify-html'); // 压缩HTML
// 打包压缩HTML gulp html
gulp.task('html', (over) => {

    gulp
        // .src('./src/html/*.html')
        .src(['./temp/**/*.json','./src/html/*.html'])
        .pipe(revCollector({// 根据json文件、去替换静态资源名称
            replaceReved: true,
            dirReplacements: {
              '../style': '../style',
              '../js': '../js'
            }
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('./dist/html'))

    over()
})

// 打包压缩IMG
gulp.task('images', (over) => {
    gulp
        .src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))

    setTimeout(() => {
        over()
    }, 30000)
})

// 打包CSS代码
gulp.task('style', (over) => {
    gulp
        .src('./src/style/*.css')
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/style'))
        
        // 写入后，得将本次生成的唯一名字保存起来，后期HTML压缩的时候替换
        .pipe(rev.manifest())
        .pipe(gulp.dest('temp/style'))  // 写入清单以build目录.
       
    over()
})

// 打包JS代码  gulp js
gulp.task('js', (over) => {
    gulp
        // .src('./src/js/a.js')
        // .src(['./src/js/a.js', './src/js/b.js'])
        .src('./src/js/*.js')
        .pipe(babel(
        {
            "presets": ["env"] 
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))

        // 写入后，得将本次生成的唯一名字保存起来，后期HTML压缩的时候替换
        .pipe(rev.manifest())
        .pipe(gulp.dest('temp/js'))  // 写入清单以build目录
    
    over()
})



// 开发使用(仿live server编辑器插件)  gulp serve===============
const {createProxyMiddleware} =require('http-proxy-middleware')
const server = require('browser-sync').create();  
const watch = require('gulp-watch');

gulp.task('serve', function() {
    server.init({
      server: './src',
      port: 80,
      middleware:[
          createProxyMiddleware('/api',{
              //目标服务器网址
              target:"http://kg.zhaodashen.cn",
              changeOrigin:true,//是否允许跨域
              secure:false,     //关闭SSL证书验证https协议接口需要改成true
              pathRewrite:{     //重写路径请求
                    '^/api':''
              }
          })
      ]
    })
    
    watch('./src/html/*.html', function(){
      console.log('修改了HTML文件，重启服务')
      server.reload()
    })
  
    watch('./src/style/*.css', function(){
        console.log('修改了CSS文件，重启服务')
        server.reload()
    })

    watch('./src/js/*.js', function(){
        console.log('修改了JS文件，重启服务')
        server.reload()
    })
})

// 代码上线  gulp build===============

gulp.task('build', gulp.series('js', 'style', 'images', 'html', () => {
    console.log('build success')
}))
 


// gulp.task('build', () => {
//     // 触发 js           任务
//     // 触发 css          任务
//     // 触发 images       任务
//     // 触发 html         任务
// })


// gulp.task('a1', function(over){
//     console.log('this is a1')
//     over()
// })
  
// gulp.task('build', gulp.series('a1', () => {
//     console.log('ok')
// }))
