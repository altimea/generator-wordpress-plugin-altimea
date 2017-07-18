// config globals
var src = './src/';
var dist = './public/assets/';
var proxyUrl = '<%= urlProxy %>';
var localPort = 3005;


// my scripts: default load all script of folder js/*
var scripts = [
  src + 'js/functions.js',
  src + 'js/main.js',
];

// node modules folder
var modules = './node_modules/';
// var plugins path: (check theme plugins before of add new plugins)
var plugins = [
  // modules + 'vue/dist/vue.js'

];


// define package
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  imagemin = require('gulp-imagemin'),
  wpPot = require('gulp-wp-pot');


// tasks
// pot files
gulp.task('potFiles', function () {
  gulp.src(['**/*.php'])
  .pipe(wpPot({
    domain: '<%= name %>'
  }))
  .pipe(gulp.dest('languages/<%= name %>.pot'));
});

// minify images
gulp.task('images', function(){
  gulp.src(src + 'img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest(dist + 'img/'));
});

// copy fonts
gulp.task('fonts', function(){
  gulp.src(src + 'fonts/**/*')
  .pipe(gulp.dest(dist + 'fonts/'));
});

// sass mappgins files
gulp.task('styles:dev', function(){
  var processors = [
    autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']})
  ];

  gulp.src(src + 'scss/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist + 'css/'))
  .pipe(browserSync.stream());
});

// sass dist remove source maps
gulp.task('styles:dist', function(){
  var processors = [
    autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']}),
    cssnano({zindex: false})
  ];

  gulp.src(src + 'scss/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss(processors))
  .pipe(gulp.dest(dist + 'css/'));
});


// script js
var scriptsTemp = [
  src + 'temp/plugins.js',
  src + 'temp/main.js'
];

// plugins js minify
gulp.task('pluginsjs', function(){
  gulp.src(plugins)
  .pipe(concat('plugins.js'))
  .pipe(uglify())
  .pipe(gulp.dest(src + 'temp/'));
});

gulp.task('scripts:temp', function(){
  gulp.src(scripts)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
  .pipe(concat('main.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(src + 'temp/'));
});

gulp.task('scripts:dev', function(){
  gulp.src(scriptsTemp)
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(concat('p-main.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist + 'js/'));
});

gulp.task('scripts:dist', function(){
  gulp.src(scriptsTemp)
  .pipe(plumber())
  .pipe(concat('p-main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dist + 'js/'));
});

// serve
gulp.task('serve', function(){
  browserSync.init({
    proxy: proxyUrl,
    port: localPort,
    reloadDebounce: 500
  });
  gulp.watch(src + 'scss/**/*.scss', ['styles:dev']);
  gulp.watch(src + 'js/**/*.js', ['scripts:temp']);
  gulp.watch(src + 'temp/**/*.js', ['scripts:dev']).on('change', reload);
  gulp.watch('./**/*.php').on('change', reload);
});

// tasks globals
gulp.task('static', ['potFiles', 'pluginsjs', 'scripts:temp', 'fonts', 'images']);
// build all
gulp.task('build', ['styles:dev', 'scripts:dev', 'static']);

// gulp minify all
gulp.task('dist', ['styles:dist', 'scripts:dist', 'static']);
// dev default tasks
gulp.task('default', ['build', 'serve']);
