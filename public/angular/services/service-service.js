angular.module('app')
  .factory('ServiceService', ['$resource', function($resource) {
    var Service = $resource('service/:id/:action', { id: '@id' }, {
      query: { method: 'GET',  isArray:true },
      get: { method: 'GET', isArray: false},
      update: { method: 'PUT'},
      delete: { method: 'DELETE', isArray: true },
    });

    return Service;
  }]);
