var gulp      = require('gulp');
var jshint    = require('gulp-jshint');
var uglify    = require('gulp-uglify');
var concat    = require('gulp-concat');
var rename    = require('gulp-rename');
var sass      = require('gulp-ruby-sass');
var maps      = require('gulp-sourcemaps');
var paths     = {
  scripts: [
    // Scripts
    'js/*.js'
  ],
  styles:     'css/sass/*.s*ss'
};

gulp.task('styles', function () {
  return sass(paths.styles, {
    style: 'compressed',
    sourcemap: true })
    .pipe(maps.write('maps'))
    .pipe(rename({
      basename : 'style',
      extname : '.min.css'
    }))
    .pipe(gulp.dest('pub/css'));
  }
);

// Join and minify the scripts
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(concat('scripts.min.js'))
  .pipe(jshint.reporter('default'))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('pub/js'));
});

gulp.task('watch',function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);
