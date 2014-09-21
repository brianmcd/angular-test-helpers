(function () {
'use strict';

angular.module('testHelpers', []).
  directive('testDirective', function () {
    return {
      restrict: 'EA',
      template: '<span class="attr-param">{{attrParam}}</span>' +
                '<span class="bound-param">{{boundParam}}</span>',
      scope: {
        attrParam: '@',
        boundParam: '=',
        fnParam: '&'
      }
    };
  });

describe('angular-test-helpers', function () {
  var $rootScope, customService;

  beforeEach(function () {
    customService = {};

    module('testHelpers');
    module(function ($provide) {
      $provide.value('customService', customService);
    });

    $rootScope = getService('$rootScope');
  });

  describe('createDirective', function () {
    beforeEach(function () {
      $rootScope.attrParam = 'myAttrValue';
      $rootScope.boundParam = 'myBoundValue';
      $rootScope.callback = jasmine.createSpy('callback');
    });

    describe('a custom element directive', function () {
      var elem;

      beforeEach(function () {
        elem = createDirective(
          '<test-directive attr-param="{{attrParam}}" bound-param="boundParam" fn-param="callback()">' +
          '</test-directive>'
        );
      });

      it('works with attribute params', function () {
        expect(elem.find('.attr-param')).toContainText('myAttrValue');
      });

      it('works with bound params', function () {
        expect(elem.find('.bound-param')).toContainText('myBoundValue');
      });

      it('works with function params', function () {
        var scope = elem.isolateScope();
        scope.fnParam();
        expect($rootScope.callback).toHaveBeenCalled();
      });
    });
  });

  describe('getService', function () {
    it('gets the custom service', function () {
      expect(getService('customService')).toBe(customService);
    });

    it('gets built-in services', function () {
      var $http;
      inject(function (_$http_) {
        $http = _$http_;
      });
      expect(getService('$http')).toBe($http);
    });
  });

  describe('createDeferred', function () {
    it('creates a deferred', function () {
      var deferred = createDeferred();
      expect(deferred.resolve).toEqual(jasmine.any(Function));
      expect(deferred.reject).toEqual(jasmine.any(Function));
    });
  });

  describe('$rootScopeDigest', function () {
    it('cranks the digest loop', function () {
      var deferred = createDeferred();
      var callback = jasmine.createSpy('callback');

      deferred.promise.then(callback);
      deferred.resolve();

      expect(callback).not.toHaveBeenCalled();

      $rootScopeDigest();

      expect(callback).toHaveBeenCalled();
    });
  });
});

})();
