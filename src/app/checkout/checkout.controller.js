'use strict';

angular.module('frontend')
  .controller('CheckoutCtrl', function ($state, $rootScope, $scope, Checkout){
    $rootScope.pageTitle   = 'Checkout';
    $rootScope.pageHeading = 'Checkout';

    $scope.checkout = {};

    // Stripe Response Handler
    $scope.stripeCallback = function (code, result) {
        $scope.processing = true;

        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
          Checkout.process({
            amount: $rootScope.calculateTotal(),
            currency: 'usd',
            cart: $rootScope.cart,
            details: $scope.checkout,
            token: result.id
          }, function(err, result){
            if(err){
              $scope.hasError = true;
              $scope.message = err;
            }else{
              $state.go('checkout.success');
              console.log(err, result);
            }
          });
        }
    };
  });
