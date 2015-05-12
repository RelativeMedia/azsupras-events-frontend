'use strict';

angular.module('frontend')
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
      return itemCount;
    }
  };
});
