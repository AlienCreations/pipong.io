(function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name pipong.controller:RootCtrl
   * @description
   * # RootCtrl
   * Root controller to handle app level failures and promise rejections
   */
  angular.module('pipong').controller('RootCtrl', ['$rootScope', '$location', '$window',
    function ($rootScope, $location, $window) {

      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        // @todo Graceful failover before launch.
        $window.alert(rejection);
      });

      this.$location = $location;

    }]);

}(angular));
