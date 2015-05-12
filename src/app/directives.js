'use strict';

angular.module('frontend')
.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle) ? $rootScope.title + ' | ' + toState.data.pageTitle : $rootScope.title;
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
])
.directive('numCartItems', function($rootScope){

  return {
    link: function(){
      var itemCount = 0;
      angular.forEach($rootScope.cart, function(item){
        //each item in event
        angular.forEach(item.items, function(){
          itemCount++;
        });
      });
      console.log(itemCount);
      return itemCount;
    }
  };
});
