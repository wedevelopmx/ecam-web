angular.module('app')
  .controller('DashboardController', ['$scope', 'VisitorService', 'MockupService', function($scope, VisitorService, MockupService) {
    // $scope.visitors = [];
    $scope.today = new Date();

    // VisitorService.query(function(visitors) {
    //   console.log(visitors);
    //   $scope.visitors = visitors;
    // });

    $scope.createVisitor = function() {
      $scope.showForm = true;
    }

    $scope.prepareCamera = function() {
      $scope.camera = 2;
      Webcam.set({
  			width: 320,
  			height: 320,
  			image_format: 'jpeg',
  			jpeg_quality: 90
  		});
  		Webcam.attach( '#camera' );
    }

    $scope.takePicture = function() {
      $scope.camera = 3;
        Webcam.snap( function(data) {
          $scope.visitor.pictureDataURI = data;
          Webcam.reset();
        });
    }

    $scope.submitVisitor = function() {
      VisitorService.save({}, $scope.visitor, function(visitor) {
        $scope.$storage.visitors.push(visitor);
        MockupService.generateVisitorHistorical(visitor, true);
        $scope.resetVisitor();
        console.log(visitor);
      });
    }

    $scope.resetVisitor = function() {
      $scope.visitor = {
        pictureDataURI: '../assets/images/profile.png',
        status: 'migrante',
        gender: 'masculino'
      };
      $scope.camera = 1;
      $scope.showForm = false;
    }

    $scope.resetVisitor();

  }]);
