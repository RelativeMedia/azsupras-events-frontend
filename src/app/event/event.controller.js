'use strict';

angular.module('frontend')
  .controller('EventCtrl', function ($state, $rootScope, $scope, Event){

    Event.get({ id: $state.params.id }, function(event){
      $rootScope.pageTitle   = event.name;
      $rootScope.pageHeading = event.name;



      $scope.event = event;
    });

    $scope.dateDiff = function(start, end){
      end     = new Date(end);
      start   = new Date(start);
      var diff = (start - end); //in ms

      if(diff/1000/60/60 <= 24 && diff/1000/60/60 >= 2){ // diff in hours
        return diff/1000/60/60 + ' Hours';

      }else if(diff/1000/60/60 <= 1) { // diff in hours
        return diff/1000/60 + ' Minutes';
      }
    };

  });
