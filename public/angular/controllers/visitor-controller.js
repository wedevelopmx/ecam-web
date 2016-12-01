angular.module('app')
  .controller('VisitorController', ['$scope', '$routeParams', 'VisitorService', 'MockupService',
  function($scope, $routeParams, VisitorService, MockupService) {
      VisitorService.get({ id: $routeParams.id }, function(visitor) {
        $scope.visitor = visitor;
        $scope.visits = MockupService.getHistorical(visitor);
        $scope.todayVisit = MockupService.getTodayVisit(visitor);
        $scope.amountOfVisits = Object.keys($scope.visits).length;
      });

      $scope.today = new Date();

      $scope.mark = function(service) {
        service.used = !service.used;
      }

      $scope.createVisit = function() {
        if($scope.amountOfVisits >= 5) {

        } else {
          $scope.todayVisit = MockupService.createVisit($scope.visitor);
          $scope.amountOfVisits = Object.keys($scope.visits).length;
        }
      }

  }]);
