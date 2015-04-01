'use strict';

angular.module('frontend')
  .factory('Event', function($resource){
    var service = {};
    var date = new Date();
    service.get = function(){
      var events = [
        {
          name: 'AZSupras 2015 BBQ',
          description: 'AZSupras 2nd Annual BBQ Event',
          titleImage: {
            md: '/assets/images/events/0/0_md.jpeg',
            lg: '/assets/images/events/0/0.jpeg'
          },
          date: date,
          content: '',
          location: {
            lat: 33.327840,
            lng: -111.834814,
            address: '450 East Knox Road',
            city: 'Chandler',
            state: 'AZ',
            zipCode: '85225'
          },
          prices: [
            {
              name: 'Adult Ticket',
              price: 10.00
            },
            {
              name: 'Child Ticket',
              price: 5.00
            }
          ]
        },
        {
          name: 'AZSupras 2015 Scenic Drive',
          description: 'AZSupras scenic drive to the top of Mt. Lemmon!',
          titleImage: {
            md: '/assets/images/events/1/1_md.jpeg',
            lg: '/assets/images/events/1/1.jpg'
          },          date: date,
          content: '',
          location: {
            lat: 33.327840,
            lng: -111.834814,
            address: '450 East Knox Road',
            city: 'Chandler',
            state: 'AZ',
            zipCode: '85225'
          },
          prices: [
            {
              name: 'Adult Ticket',
              price: 10.00
            },
            {
              name: 'Child Ticket',
              price: 5.00
            }
          ]
        },
        {
          name: 'AZSupras 2015 Scenic Drive',
          description: 'AZSupras scenic drive to the top of Mt. Lemmon!',
          titleImage: {
            md: '/assets/images/events/2/2_md.jpeg',
            lg: '/assets/images/events/2/2.jpg'
          },          date: date,
          content: '',
          location: {
            lat: 33.327840,
            lng: -111.834814,
            address: '450 East Knox Road',
            city: 'Chandler',
            state: 'AZ',
            zipCode: '85225'
          },
          prices: [
            {
              name: 'Adult Ticket',
              price: 10.00
            },
            {
              name: 'Child Ticket',
              price: 5.00
            }
          ]
        },
        {
          name: 'AZSupras 2015 Scenic Drive',
          description: 'AZSupras scenic drive to the top of Mt. Lemmon!',
          titleImage: {
            md: '/assets/images/events/3/3_md.jpeg',
            lg: '/assets/images/events/3/3.jpg'
          },          date: date,
          content: '',
          location: {
            lat: 33.327840,
            lng: -111.834814,
            address: '450 East Knox Road',
            city: 'Chandler',
            state: 'AZ',
            zipCode: '85225'
          },
          prices: [
            {
              name: 'Adult Ticket',
              price: 10.00
            },
            {
              name: 'Child Ticket',
              price: 5.00
            }
          ]
        }
      ];

      return events;
    };

    return service;

  });
