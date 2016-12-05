angular.module('app')
  .factory('MockupService', ['$sessionStorage', 'ServiceService',  function($storage, ServiceService) {

    ServiceService.query(function(services) {
      $storage.services = [];
      for(var i = 0 ; i < services.length; i++)
        $storage.services.push(services[i]);
    });

    // $storage.services = [
    //   { name: 'Entrevista', icon: 'assets/images/icon/talking.png'},
    //   { name: 'REDEDOM', icon: 'assets/images/icon/laptop.png'},
    //   { name: 'Comida', icon: 'assets/images/icon/cutlery.png'},
    //   { name: 'Ropería', icon: 'assets/images/icon/briefcase.png'},
    //   { name: 'Donativos', icon: 'assets/images/icon/donation.png'},
    //   { name: 'Lavanderia', icon: 'assets/images/icon/shirt.png'},
    //   { name: 'Hospedaje', icon: 'assets/images/icon/bed.png'},
    //   { name: 'Llamada', icon: 'assets/images/icon/phone-call.png'},
    //   { name: 'Atn. Medica', icon: 'assets/images/icon/stethoscope.png'},
    //   { name: 'Atn. Juridica', icon: 'assets/images/icon/lawyer.png'},
    //   { name: 'Atn. Psicologica', icon: 'assets/images/icon/psi.png'}
    // ];

    var Mockup = {
      oneDay: 86400000,
      oneHour: 3600000,
      comments: [
        { conflict: false , name: 'Ofrecio ayuda', description: 'se ofrecio a ayudar en limpieza de cocina' },
        { conflict: false , name: 'Informacion', description: 'pidio informacion sobre asuntos legales' },
        { conflict: true , name: 'abuso verbal', description: 'Se hizo de palabras con otro migrante en el comedor' },
        { conflict: true , name: 'pelea en area comun', description: 'Propicio una pelea en area comun' },
        { conflict: false , name: 'Disculpa', description: 'ofrecio disculpas por comportamiento conflicitivo' },
      ],
      generateVisitorsHistorical: function(visitors) {
        if($storage.vh == undefined) $storage.vh = {};
        for(var i = 0; i < visitors.length; i ++) {
          var visitor = visitors[i];
          if(! this.hasHistorical(visitor)){
            console.log('Generating historical for: ' + visitor.firstName + " " + visitor.id);
            this.generateVisitorHistorical(visitor, false);
          }
        }
        return  $storage.vh;
      },
      generateVisitorHistorical: function(visitor, empty) {
        $storage.vh[visitor.id] = empty ? [] : this.generateHistorical();
      },
      getHistorical: function(visitor) {
        return $storage.vh[visitor.id];
      },
      hasHistorical: function(visitor) {
        return $storage.vh.hasOwnProperty(visitor.id);
      },
      generateHistorical: function() {
        var historical = [];
        var days = 2 + Math.floor(Math.random() * 4);
        var now = Date.now() - this.oneDay;

        for(var i = 0; i < days; i++) {
          historical.push(this.generateVisit(now, false));
          now -= this.oneDay;
        }
        return historical;
      },
      getTodayVisit: function(visitor) {
        var historical = this.getHistorical(visitor);
        if(historical == undefined || historical.length <= 0) return null;
        var now = new Date(Date.now());
        var latest = new Date(historical[0].date);
        if(now.getFullYear() == latest.getFullYear() && now.getMonth() == latest.getMonth() && now.getDate() == latest.getDate())
          return historical[0];
        return null;
      },
      generateVisit: function(visitDate, empty) {
        return {
          date: visitDate,
          services: this.generateServices(empty),
          comments: empty ? [] : this.generateComments(visitDate),
          comment: empty ? { conflict: false, text: '' } : this.generateComment()
        };
      },
      generateComments: function(visitDate) {
        var comments = [];
        var number = Math.floor(Math.random() * 5);
        for(var i = 0 ; i < number; i++) {
          if(Math.random() > 0.5) {
            var comment = this.generateComment(visitDate);
            comment.date = visitDate + ((Math.floor(Math.random() * 7) * this.oneHour));
            comments.push(comment);
          }
        }
        return comments;
      },
      generateComment: function() {
        var item = Math.floor(Math.random() * this.comments.length);
        return this.comments[item];
      },
      generateServices: function(empty) {
        var services = [];
        for(item in $storage.services) {
          services.push({
            name: $storage.services[item].name,
            description: $storage.services[item].description,
            pictureDataURI: $storage.services[item].pictureDataURI,
            used: empty ? false : (Math.random() > 0.4 ? true : false)
          });
        }
        return services;
      },
      createVisit: function(visitor) {
        var now = Date.now();
        var historical = this.getHistorical(visitor);
        var visit = this.generateVisit(now, true);
        historical.unshift(visit);
        return visit;
      }
    };

    return Mockup;
  }]);
