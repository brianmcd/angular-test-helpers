module.exports = {
  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '.',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine'],


  // list of files / patterns to load in the browser
  files: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
    'src/**/*.js',
    'test/**/*.spec.js'
  ],


  // list of files to exclude
  exclude: [
  ],


  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress', 'growl'],


  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['Chrome'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false
};
