'use strict';

angular.module('frontend')
.factory('Event', function($resource, $rootScope){
  return $resource($rootScope.api.endPoint + '/event/:id', { id: '@_id'});
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
    findItem: function(Event, Item){

    },
    removeItem: function(Event, Item){

      angular.forEach($rootScope.cart, function(cartItem){
        if(cartItem.id === Event.id){
          angular.forEach(cartItem.items, function(item, key){
            if(item.slug === Item.name.toLowerCase() ){
              cartItem.items.splice(key, 1);
            }
          });
        }
      });
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

.factory('Checkout', function($http, $rootScope){

  return {
    process: function(cart, cb){
      $http
      .post($rootScope.api.endPoint + '/checkout', cart)
      .success(function(data, status, headers, config){
        cb(null, data);
      })
      .error(function(data, status, headers, config){
        console.error('Uhoh looks like there was a server error!', data, status, headers);
        cb(data);
      });
    }
  };

});
