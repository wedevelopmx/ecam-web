angular.module('app')
  .config(['$httpProvider', function($httpProvider) {
    // $httpProvider.interceptors.push(function($q, $location,$rootScope) {
    // 	return {
    // 		response: function(response) {
    // 			return response;
    // 		},
    // 		responseError: function(response) {
    // 			console.log('Response: ' );
    // 			console.log(response);
    // 			if (response.status === 401)  {
    // 				$rootScope.message = 'You need to log in.';
    // 				$location.url('/');
    // 			}

    // 			return $q.reject(response);
    // 		}
    // 	};
    // });
  }])
  .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
    //Review if user has been authenticated before
    Auth.init();
    $rootScope.$on('$routeChangeError', function(event, next, current) {
      if(current !== undefined)
        $location.url(current.$$route.originalPath);
      else
        $location.url('/');
    });
    }])
  .constant('policies',{
    '/': {
      templateUrl: 'angular/templates/ecam/dashboard/index.html',
      controller: 'DashboardController',
      permissions: ['admin']
    },
    '/dashboard': {
      templateUrl: 'angular/templates/ecam/dashboard/index.html',
      controller: 'DashboardController',
    },
    '/admin': {
      templateUrl: 'angular/templates/ecam/admin/index.html',
      controller: 'AdminController'
    },
    '/visitor/:id': {
      templateUrl: 'angular/templates/ecam/visitor/index.html',
      controller: 'VisitorController'
    },
    '/performance/visitor': {
      templateUrl: 'angular/templates/ecam/performance/visitor.html',
      controller: 'VisitorPerformanceController'
    },
    '/performance/resource': {
      templateUrl: 'angular/templates/ecam/performance/resource.html',
      controller: 'ResourcePerformanceController'
    },
    '/profile': {
      templateUrl: 'angular/templates/profile/profile.html',
      controller: 'ProfileController'
    },
    '/profile/:id': {
      templateUrl: 'angular/templates/profile/profile.html',
      controller: 'ProfileController'
    },
    '/settings': {
      templateUrl: 'angular/templates/profile/settings.html',
      controller: 'SettingsController'
    }
  })
  .config(['$routeProvider', 'policies', function($routeProvider, policies) {
    //Our NOT THAT complex logic for authentification and authorization validation
    var authResolver = function(path) {
      return {
        routingMessage : function(Auth, $q, $rootScope) {
        console.log(path)
        var deferred = $q.defer();

        Auth.userHasPermissionForView(path)
          .then(function(msg) {
            console.log(msg);
            deferred.resolve();
          }, function(msg) {
            $rootScope.message = msg;
            deferred.reject();
          });

        return deferred.promise;
      }
      }
    };

    //Configuring Routes and Auth
    for(path in policies) {
      //Build Route
      var route = {
        templateUrl: policies[path].templateUrl,
        controller: policies[path].controller
      };

      //Sync with server about user status
      route.resolve =  authResolver(path);

      //Register route
      $routeProvider.when(path, route);
    }

    $routeProvider.otherwise({redirectTo: '/'});
  }]);
