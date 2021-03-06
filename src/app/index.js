'use strict';

angular.module('frontend', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'angularPayments',
  'gavruk.card',
  'angulartics',
  'angulartics.google.analytics'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('event', {
        url: '/event/:id',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'app/checkout/index.html',
        controller: 'CheckoutCtrl'
      })
      .state('checkoutSuccess', {
        url: '/checkout/success',
        templateUrl: 'app/checkout/success.html',
        controller: 'CheckoutSuccessCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }).run(function($rootScope, $state, $stateParams, localStorageService, Cart){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if(toState.title){
        $rootScope.pageTitle = toState.title;
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams){
      $rootScope.pageTitle = 'Event Schedule';
    });

    $rootScope.api = {
      endPoint: 'https://api.azsupras.com/v1'
    };

    $rootScope.calculateTotal = function(){
      return Cart.calculateTotal();
    };

    $rootScope.clearCart = function(){
      Cart.clear();
    };

    $rootScope.calculateCartCount = function(){
      var itemCount = 0;
      angular.forEach($rootScope.cart, function(item){
        //each item in event
        angular.forEach(item.items, function(item){
          itemCount = itemCount + item.qty;
        });
      });
      return itemCount;
    };
    $rootScope.cart = localStorageService.get('event.cart') || [];
    // $rootScope.cart = [];
  });
