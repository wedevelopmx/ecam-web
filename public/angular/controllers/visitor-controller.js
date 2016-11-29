angular.module('app')
  .controller('VisitorController', ['$scope', '$routeParams', 'VisitorService', function($scope, $routeParams, VisitorService) {
      VisitorService.get({ id: $routeParams.id }, function(visitor) {
        $scope.visitor = visitor;
      });

      var generateComment = function() {
        var comment = [
          { conflict: false, text: '' },
          { conflict: false, text: '' },
          { conflict: false, text: '' },
          { conflict: false, text: '' },
          { conflict: false , text: 'se ofrecio a ayudar en limpieza de cocina' },
          { conflict: false , text: 'pidio informacion sobre asuntos legales' },
          { conflict: true , text: 'abuso verbal en comedor' },
          { conflict: true , text: 'pelea en area comun' },
          { conflict: false , text: 'ofrecio disculpas por comportamiento conflicitivo' },
        ];

        var item = Math.floor(Math.random() * comment.length);
        console.log(comment);
        return comment[item];
      }

      $scope.visits = [];
      var days = 2 + Math.floor(Math.random() * 5);
      var oneDay = 86400000;
      var now = Date.now();

      for(var i = 0; i < days; i++) {
        visit = {
          date: new Date(now),
          services: ['Entrevista', 'Registro', 'Comida', 'Servicio Medico', 'Llamada'],
          comment: generateComment()
        };



        now -= oneDay;
        $scope.visits.push(visit);
      }




      // $scope.visits = [
      //   { date: '28 Nov', services: ['Entrevista', 'Registro', 'Comida', 'Servicio Medico', 'Llamada'], comment: { conflict: false, text: 'Se disculpo por incidente en cocina' }},
      //   { date: '27 Nov', services: ['Entrevista', 'Registro', 'Comida', 'Servicio Medico', 'Llamada'], comment: { conflict: true, text: 'Abuso verbal en comedor' }},
      //   { date: '26 Nov', services: ['Entrevista', 'Registro', 'Comida', 'Servicio Medico', 'Llamada'], comment: { conflict: false, text: '' }}
      // ];
  }]);
