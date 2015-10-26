'use strict';

/**
 * @ngdoc function
 * @author seancannon
 * @name pipong.controller.PlayerProfileCtrl
 * @description
 * # PlayerProfileCtrl
 * Player profile controller
 */
angular.module('pipong').controller('PlayerProfileCtrl', ['R', '$routeParams',
  function(R, $routeParams) {
    this.playerId = R.defaultTo('foo', R.prop('playerId', $routeParams));
  }]);
