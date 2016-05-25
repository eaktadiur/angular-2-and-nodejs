var gulp = require('gulp');

var appDev = 'assets/app/';
var appProd = 'public/app/';
var vendor = 'public/vendor';

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
// Other
var concat = require('gulp-concat');

var tsProject = typescript.createProject('tsconfig.json');


gulp.task('build-ts', function () {
  return gulp.src(appDev + '**/*.ts')
  .pipe(sourcemaps.init())
  .pipe(typescript(tsProject))
  .pipe(sourcemaps.write())
        // .pipe(jsuglify())
        // .pipe(concat('bundle.js'))
        .pipe(gulp.dest(appProd));
      });

gulp.task('build-copy', function () {

  return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
  .pipe(gulp.dest(appProd));
});

gulp.task('vendor', function() {

  // Angular 2 Framework
  gulp.src('node_modules/@angular/**')
  .pipe(gulp.dest(vendor + '/@angular'));

  //ES6 Shim
  gulp.src('node_modules/es6-shim/**')
  .pipe(gulp.dest(vendor + '/es6-shim/'));

  //reflect metadata
  gulp.src('node_modules/reflect-metadata/**')
  .pipe(gulp.dest(vendor + '/reflect-metadata/'));

  //rxjs
  gulp.src('node_modules/rxjs/**')
  .pipe(gulp.dest(vendor + '/rxjs/'));

  //systemjs
  gulp.src('node_modules/systemjs/**')
  .pipe(gulp.dest(vendor + '/systemjs/'));

  //zonejs
  return gulp.src('node_modules/zone.js/**')
  .pipe(gulp.dest(vendor + '/zone.js/'));
});

gulp.task('start', function () {
  nodemon({
    script: './bin/www'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('watch', function () {
  gulp.watch(appDev + '**/*.ts', ['build-ts']);
  gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
});

gulp.task('default', ['watch', 'build-ts', 'build-copy', 'start']);