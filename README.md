# Gulp 开发微信小程序

* 使用 sass 开发 wxss
* 支持 px2rpx（将px转换成rpx, 1px = 2rpx）
* 支持es6/7 开发 js（es6 代码可转换成es5）

## 项目目录结构

```
[ 
     |-- gulpfile.js', //gulp打包工具配置文件
     |-- package.json', //项目依赖环境
     |-- README.md',
     |-- client', //小程序开发环境，写代码的文件
     |   |-- app.js', //小程序逻辑 程序入口
     |   |-- app.json', //小程序公共配置
     |   |-- app.scss', //小程序公共样式表
     |   |-- project.config.json', // 小程序项目配置
     |   |-- filter', //自定义的 过滤器
     |   |   |-- filter.wxs',
     |   |-- img', // 图片资源
     |   |   |-- wave_two.png',
     |   |-- lib', 
     |   |   |-- API.js', // API文件 后台接口统一存放
     |   |-- pages',
     |   |   |-- index',
     |   |   |   |-- index.js',
     |   |   |   |-- index.json',
     |   |   |   |-- index.scss',
     |   |   |   |-- index.wxml',
     |   |   |-- logs',
     |   |       |-- logs.js',
     |   |       |-- logs.json',
     |   |       |-- logs.scss',
     |   |       |-- logs.wxml',
     |   |-- utils',
     |       |-- util.js',
     |-- dist' //生产环境，开发环境生成的文件
   ]
```

## 使用

```bash
想了解gulp，请移步   <a href="https://www.gulpjs.com.cn/docs/getting-started/
">https://www.gulpjs.com.cn/docs/getting-started/
</a>
# 安装项目依赖
npm install

# 启动 gulp 编译 client 文件夹，会自动生成dist文件夹(编译的时候可能会报错，将dist整个文件删除，重新编译即可)
npm run dev

# 上线打包
npm run build

```

