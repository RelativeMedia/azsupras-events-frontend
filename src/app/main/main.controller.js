'use strict';

angular.module('frontend')
  .controller('MainCtrl', function ($state, $scope, Event){
    var events = Event.query(function(){
      $scope.hover = function(event){
        return event.showDetails = ! event.showDetails;
      };


      $scope.parseDate = function(event){
        var startDate = new Date(event.startDate);
        var endDate   = new Date(event.endDate);

        /**
         * date is less than 24 hours, so combine the startDate and the hours
         * from endDate.
         */
        if((endDate - startDate)/1000 <= 86400000){
          var date = moment(startDate).format('MMM Do, YYYY hh:mm A') + ' - ' + moment(endDate).format('hh:mm A');
        }
        return date;
      };

      $scope.events = events;
      $scope.title = 'Event Schedule';
    });

  });
