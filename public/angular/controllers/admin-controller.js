angular.module('app')
  .controller('AdminController', ['$scope', 'FileUploader', 'ServiceService', 'MockupService',
  function($scope, FileUploader, ServiceService, MockupService) {
    var uploader = $scope.uploader = new FileUploader({});

    ServiceService.query(function(services) {
      $scope.$storage.services = services;
      console.log(services);
    });

    // FILTERS
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onAfterAddingFile = function(fileItem) {
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
          $scope.$apply(function() {
            $scope.service.pictureDataURI = reader.result;
            $scope.upload = 2;
          });
        }, false);

        if (fileItem._file) {
          reader.readAsDataURL(fileItem._file);
        }
    };

    $scope.createService = function() {
      $scope.showForm = true;
    };

    $scope.submitService = function() {
      ServiceService.save({}, $scope.service, function(service) {
        $scope.$storage.services.push(service);
        $scope.resetService();
        console.log(service);
      });
    };

    $scope.resetService = function() {
      $scope.service = {
        onlyImmigrant: false,
        oneTime: false,
        storeList: false
      }
      $scope.showForm = false;
      $scope.upload = 1;
    };

    $scope.resetService();
  }]);
