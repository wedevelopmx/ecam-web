angular.module('app')
  .controller('VisitorController', ['$scope', function($scope) {
    $scope.visitors = [];

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
      console.log($scope.visitor);
      $scope.visitors.push($scope.visitor);
      $scope.resetVisitor();
    }

    $scope.resetVisitor = function() {
      $scope.visitor = {
        pictureDataURI: '../assets/images/profile.png'
      };
      $scope.camera = 1;
    }

    $scope.resetVisitor();

  }]);
