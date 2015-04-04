'use strict';

angular.module('frontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap'])
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
      });

    $urlRouterProvider.otherwise('/');
  });
