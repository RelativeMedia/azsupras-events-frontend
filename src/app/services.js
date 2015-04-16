'use strict';

angular.module('frontend')
.factory('Event', function($resource){
  return $resource('/api/event/:id', { id: '@_id'});
})

.service('Cart', ['$rootScope', 'localStorageService', '$filter', function($rootScope, localStorageService, $filter){
  return {
    items: function(){
      return $rootScope.cart;
    },
    addItem: function(event, Item){
      var cartItem = $filter('filter')($rootScope.cart, { id: event.id }, true);
      if(cartItem.length <= 0){
        // event isnt in cart yet, which means no items are in cart yet
        // add an event with whatever item we clicked.
        $rootScope.cart.push({
          name: event.name,
          id: event.id,
          items: [{
            slug: Item.name.toLowerCase(),
            name: Item.name,
            qty: 1,
            cost: Item.amount
          }]
        });
      }else{
        //find item in
        var found = $filter('filter')(cartItem[0].items, {slug: Item.name.toLowerCase()}, true);

        if(found.length <= 0){
          cartItem[0].items.push({
            slug: Item.name.toLowerCase(),
            name: Item.name,
            qty: 1,
            cost: Item.amount
          });
        }else{
          found[0].qty++;
        }
      }
      localStorageService.set('event.cart', $rootScope.cart);
    },
    removeItem: function(){
      // @TODO
    },
    updateQty: function(){
      // @TODO
    },
    calculateTotal: function(){
      var grandTotal = 0.00;
      //each event
      angular.forEach($rootScope.cart, function(item){
        //each item in event
        angular.forEach(item.items, function(item){
          var subTotal = parseFloat(item.cost) * item.qty;
          grandTotal = parseFloat(grandTotal) + parseFloat(subTotal);
        });
      });
      return parseFloat(grandTotal).toFixed(2);
    },
    clear: function(){
      $rootScope.cart.length = 0;
      localStorageService.remove('event.cart');
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
