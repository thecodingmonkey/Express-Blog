var gulp = require('gulp');
var sass = require('gulp-sass');
var refresh = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var livereloadport = 35729;

gulp.task('server', function () {
  //restart on app.js changes
  nodemon({ script : './app/server.js'})
    .on('restart', function () {
      console.log('Going to restart server!')
      setTimeout(function () {
        console.log('Restarted server!')
        refresh.changed("./app/server.js");
      }, 500);
    });

});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass( { errLogToConsole : true } ))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  //listen for live reload 
  refresh.listen(livereloadport);
  gulp.watch('./sass/**/*.scss', ['sass']);
  //live reload for jade template changes or static assets change
  gulp.watch([
    './public/**/*',
    'views/**/*.jade'], refresh.changed);

});
gulp.task('default', ['server','watch','sass']);