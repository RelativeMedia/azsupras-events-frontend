'use strict';

angular.module('frontend')
.factory('Event', function($resource){
  return $resource('/api/event/:id', { id: '@_id'});
})
.service('Store', ['$window', function ($window) {
  return {
    get: function (key) {
      if ($window.localStorage [key]) {
        var cart = angular.fromJson($window.localStorage [key]);
        return JSON.parse(cart);
      }
      return false;
    },

    set: function (key, val) {
      if (val === undefined) {
        $window.localStorage .removeItem(key);
      } else {
        $window.localStorage [key] = angular.toJson(val);
      }
      return $window.localStorage [key];
    }
  };
}])
.factory('Checkout', function($http){

  return {
    process: function(cart, cb){
      $http
      .post('/api/checkout', cart)
      .success(function(data, status, headers, config){
        cb(null, data);
      })
      .error(function(data, status, headers, config){
        cb(data);
      });
    }
  };

});
