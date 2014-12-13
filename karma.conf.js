module.exports = function(config) {
  config.set({
    files: [
      'libs/angular/angular.js',
      'libs/angular-mocks/angular-mocks.js',
      'libs/angular-route/angular-route.js',
      'libs/requirejs/require.js',
      'libs/caman/dist/caman.full.js',
      'libs/stringview/stringview.js',
      'libs/zlib-asm/zlib.js',
      'libs/chai/chai.js',
      'libs/sinon/lib/sinon.js',
      'libs/sinon-chai/lib/sinon-chai.js',
      'js/app.js',
      'js/controllers/*.js',
      'js/directives/*.js',
      'specs/**/*.js'
    ],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['progress'],
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}