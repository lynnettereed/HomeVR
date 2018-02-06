const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

// Development mode?
var devBuild = (process.env.NODE_ENV !== 'production');

// Folders
var folder = {
  src: 'src/',
  build: 'public/css',
};

// CSS Processing
gulp.task('css', function() {
  var postCssOpts = [
    autoprefixer({ browsers: ['last 2 versions', '>2%'] }),
    mqpacker,
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'scss/styles.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 3,
      errLogToConsole: true,
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build));
});
