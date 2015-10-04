(function() {
  'use strict';

  angular.module('pipong', [

    // Core modules
    'ngSanitize',
    'ngRoute',
    'ngResource',

    // Custom modules (app/modules/*)
    'ramda'
  ]).config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {


      $routeProvider.
        when('/', {
          templateUrl : '/views/pages/index',
          controller  : 'MainCtrl as mainCtrl'
        }).
        //when('/new-game', {
        //  templateUrl : '/pages/player-select',
        //  controller  : 'PlayerSelectCtrl as playerSelectCtrl'
        //}).
        otherwise({
          redirectTo : '/'
        });

      $locationProvider.html5Mode(true);

    }]);

}());
