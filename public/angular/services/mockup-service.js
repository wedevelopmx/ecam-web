angular.module('app')
  .factory('MockupService', ['$resource', function($resource) {
    var Mockup = {
      oneDay: 86400000,
      services: [
        { name: 'Entrevista', icon: 'assets/images/icon/talking.png'},
        { name: 'REDEDOM', icon: 'assets/images/icon/laptop.png'},
        { name: 'Comida', icon: 'assets/images/icon/cutlery.png'},
        { name: 'Ropería', icon: 'assets/images/icon/briefcase.png'},
        { name: 'Donativos', icon: 'assets/images/icon/donation.png'},
        { name: 'Hospedaje', icon: 'assets/images/icon/bed.png'},
        { name: 'Llamada', icon: 'assets/images/icon/phone-call.png'},
        { name: 'Atn. Medica', icon: 'assets/images/icon/stethoscope.png'},
        { name: 'Atn. Juridica', icon: 'assets/images/icon/lawyer.png'},
        { name: 'Atn. Psicologica', icon: 'assets/images/icon/psi.png'}
      ],
      comments: [
        { conflict: false, text: '' }, { conflict: false, text: '' },
        { conflict: false, text: '' }, { conflict: false, text: '' },
        { conflict: false , text: 'se ofrecio a ayudar en limpieza de cocina' },
        { conflict: false , text: 'pidio informacion sobre asuntos legales' },
        { conflict: true , text: 'abuso verbal en comedor' },
        { conflict: true , text: 'pelea en area comun' },
        { conflict: false , text: 'ofrecio disculpas por comportamiento conflicitivo' },
      ],
      visitors: {},
      generatevisitorBackground: function(visitor) {
        this.visitors[visitor.id] = this.generateHistorical();
      },
      getHistorical: function(visitor) {
        return this.visitors[visitor.id];
      },
      generateHistorical: function() {
        var historical = {};
        var days = 2 + Math.floor(Math.random() * 3);
        var now = Date.now() - this.oneDay;

        for(var i = 0; i < days; i++) {
          historical[now] = this.generateVisit(now);
          now -= this.oneDay;
        }
        return historical;
      },
      generateVisit: function(visitDate) {
        return {
          date: visitDate,
          services: this.generateServices(),
          comment: this.generateComment()
        };
      },
      generateComment: function() {
        var item = Math.floor(Math.random() * this.comments.length);
        return this.comments[item];
      },
      generateServices: function() {
        var services = [];
        for(item in this.services) {
          services.push({
            name: this.services[item].name,
            icon: this.services[item].icon,
            used: Math.random() > 0.4 ? true : false
          });
        }
        return services;
      },
      createService: function(visitor) {
        var now = Date.now();
        var historical = this.getHistorical(visitor);
        historical[now] = this.generateVisit(now);
        return historical[now];
      }
    };

    return Mockup;
  }]);
