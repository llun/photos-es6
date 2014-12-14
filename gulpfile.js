var gulp = require('gulp')

gulp.task('unit', function() {
  console.log ('Run unit test')
})

gulp.task('integration', function() {
  console.log ('Run integration test')
})

gulp.task('test', ['unit', 'integration'])

gulp.task('default', ['test'])