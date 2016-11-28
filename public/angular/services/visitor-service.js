angular.module('app')
  .factory('VisitorService', ['$resource', function($resource) {
    var Visitor = $resource('visitor/:id/:action', { id: '@id' }, {
      query: { method: 'GET',  isArray:true },
      get: { method: 'GET', isArray: false},
      update: { method: 'PUT'},
      delete: { method: 'DELETE', isArray: true },
    });

    return Visitor;
  }]);
