angular.module('app')
  .controller('VisitorController', ['$scope', '$routeParams', 'VisitorService', 'MockupService',
  function($scope, $routeParams, VisitorService, MockupService) {
      VisitorService.get({ id: $routeParams.id }, function(visitor) {
        $scope.visitor = visitor;
        console.log(visitor);
        MockupService.generatevisitorBackground(visitor);
        $scope.visits = MockupService.getHistorical(visitor);
        $scope.amountOfVisits = Object.keys($scope.visits).length;
      });

      $scope.today = new Date();

      $scope.mark = function(service) {
        service.used = !service.used;
      }

      $scope.createVisit = function() {
        $scope.services = MockupService.createService($scope.visitor).services;
        console.log($scope.visits);
      }

  }]);
