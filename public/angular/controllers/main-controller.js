angular.module('app')
  .controller('MainController', ['$scope', '$location', '$sessionStorage', 'Auth', 'VisitorService','MockupService',
  function($scope, $location, $storage, Auth, VisitorService, MockupService) {
    $scope.app = {
      name: 'Hexagon',
      version: '1.0.0',
      // for chart colors
      color: {
        'primary':      '#0cc2aa',
        'accent':       '#a88add',
        'warn':         '#fcc100',
        'info':         '#6887ff',
        'success':      '#6cc788',
        'warning':      '#f77a99',
        'danger':       '#f44455',
        'white':        '#ffffff',
        'light':        '#f1f2f3',
        'dark':         '#2e3e4e',
        'black':        '#2a2b3c'
      },
      setting: {
        theme: {
          primary: 'primary',
          accent: 'accent',
          warn: 'warn'
        },
        folded: false,
        boxed: false,
        container: false,
        themeID: 1,
        bg: ''
      }
    };

    $scope.logout =function() {
			Auth.logout();
			$location.url('/');
		}

    //Quering database visitors and generating demo data
    $scope.$storage = $storage;
    VisitorService.query(function(visitors) {
      $scope.$storage.visitors = visitors;
      $scope.$storage.vh = MockupService.generateVisitorsHistorical(visitors);
    });
  }]);
