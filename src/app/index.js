'use strict';

angular.module('frontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'LocalStorageModule', 'angularPayments', 'gavruk.card'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        data: {
          pageTitle: 'Event Schedule',
          pageHeading: 'Event Schedule'
        },
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
      .state('checkout.success', {
        url: '/checkout/success',
        templateUrl: 'app/checkout/success.html',
        controller: 'CheckoutCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }).run(function($rootScope, localStorageService){

    $rootScope.calculateTotal = function(){
      var total = 0.00;
      angular.forEach($rootScope.cart, function(item){
        total = parseFloat(total) + parseFloat(item.price);
      });
      return parseFloat(total).toFixed(2);
    };

    $rootScope.cart = localStorageService.get('event.cart') || [];
  });
