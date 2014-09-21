(function () {
'use strict';

/**
 * Creates a directive to poke at with tests.
 * 
 * @param {string} template - The template for the directive.
 * @returns {Object} jQuery/jqLite element
 *
 * Example:
 *
 * $rootScope.attrParam = 'some value';
 * var elem = createDirective('<my-directive attr1="{{attrParam}}"></my-directive>');
 */
window.createDirective = function (template) {
  var elem;
  inject(function ($compile, $rootScope) {
    elem = $compile(template)($rootScope);
    $rootScope.$digest();
  });
  return elem;
};

/**
 * Gets a service from the injector.
 *
 * @param {string} serviceName - The name of the service to get.
 * @returns {*} The instance
 *
 * Example:
 *
 * var $rootScope = getService('$rootScope');
 */
window.getService = function (serviceName) {
  var service;
  inject(function ($injector) {
    service = $injector.get(serviceName);
  });
  return service;
};

/**
 * Creates a deferred object.
 *
 * @returns {Object} The deferred.
 */
window.createDeferred = function () {
  return getService('$q').defer();
};

/**
 * Cranks the digest loop by calling $rootScope.$digest().
 * Useful if you don't need to inject $rootScope otherwise.
 */
window.$rootScopeDigest = function () {
  getService('$rootScope').$digest();
};

})();
