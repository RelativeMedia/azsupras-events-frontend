'use strict';

angular.module('frontend')
.factory('Event', function($resource){
  return $resource('http://localhost:1337/api/event/:id', { id: '@_id'});
});
