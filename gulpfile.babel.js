import gulp from 'gulp'
import babel from 'gulp-babel'
import rimraf from 'gulp-rimraf'
import plumber from 'gulp-plumber'
import server from 'gulp-develop-server'
import gutil from 'gulp-util'
import runSequence from 'run-sequence'

/* Build Tasks */

gulp.task('build-src', () => gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(babel())
  .on('error', err => {
    gutil.log(gutil.colors.red('[Code Compilation Error]'))
    gutil.log(gutil.colors.red(err.message))
  })
  .pipe(gulp.dest('build')))

gulp.task('clean-build', () => gulp.src('build', { read: false }).pipe(rimraf()))

gulp.task('watch-build', () => gulp.watch('src/**/*', ['build', server.restart]))

gulp.task('bot:start', () => server.listen({ path: './index.js' }))

/* Watch Tasks */

gulp.task('start-dev', callback => runSequence('clean-build', 'build-src', 'watch-build', 'bot:start', callback))

gulp.task('start', callback => runSequence('clean-build', 'build-src', 'bot:start', callback))

gulp.task('build', callback => runSequence('clean-build', 'build-src', callback))
