angular.module('app')
  .controller('VisitorController', ['$scope', '$routeParams', 'VisitorService', 'MockupService',
  function($scope, $routeParams, VisitorService, MockupService) {
      VisitorService.get({ id: $routeParams.id }, function(visitor) {
        $scope.visitor = visitor;
        $scope.visits = MockupService.getHistorical(visitor);
        $scope.todayVisit = MockupService.getTodayVisit(visitor);
        $scope.amountOfVisits = Object.keys($scope.visits).length;
        var birthdate = new Date($scope.visitor.birthdate);
        $scope.visitorAge = $scope.today.getFullYear() - birthdate.getFullYear();
      });

      $scope.today = new Date();

      $scope.selectService = function(service) {
        $scope.iService = service;
      }

      $scope.serviceProvided = function() {
        $scope.iService.used = !$scope.iService.used;
      }

      $scope.createVisit = function() {
        if($scope.amountOfVisits >= 5) {

        } else {
          $scope.todayVisit = MockupService.createVisit($scope.visitor);
          $scope.amountOfVisits = Object.keys($scope.visits).length;
        }
      }

      $scope.submitComment = function() {
        console.log($scope.todayVisit);
        $scope.todayVisit.comments.push($scope.comment);
        $scope.resetComment();
      }

      $scope.resetComment = function() {
        $scope.newComment = false;
        $scope.comment = {};
      }

      $scope.resetComment();
  }]);
