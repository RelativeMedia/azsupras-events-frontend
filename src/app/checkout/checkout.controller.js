'use strict';

angular.module('frontend')
  .controller('CheckoutCtrl', function ($state, $rootScope, $scope, Checkout, Cart){
    $rootScope.pageTitle   = 'Checkout';
    $rootScope.pageHeading = 'Checkout';
    $scope.checkout = {};


    $scope.deleteItem = function(event, item){
      Cart.removeItem(event, item);
    };

    // Stripe Response Handler
    $scope.stripeCallback = function (code, result) {
        $scope.processing = true;

        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {

          Checkout.process({
            amount: Cart.calculateTotal(),
            currency: 'usd',
            cart: Cart.items(),
            details: $scope.checkout,
            token: result.id
          }, function(err, result){
            if(err){
              console.error(err);
              $scope.hasError = true;
              $scope.processing = false;
              $scope.message = err;
            }else{
              Cart.clear();
              $state.go('checkoutSuccess');
              console.log(err, result);
            }
          });
        }
    };
  });
