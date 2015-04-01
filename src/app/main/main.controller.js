'use strict';

angular.module('frontend')
  .controller('MainCtrl', function ($scope, Event){
    var events = Event.get();
    var firstEvent = events.splice(0,1);

    $scope.firstEvent = firstEvent[0];
    $scope.events = events;

    $scope.title = 'Event Schedule';
  });
