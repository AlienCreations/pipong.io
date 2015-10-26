'use strict';

/**
 * @ngdoc function
 * @author seancannon
 * @name pipong.directive.playerProfile
 * @description
 * # playerProfile
 * Player profile UI
 */
angular.module('pipong').directive('playerProfile', ['R', 'PlayerSvc',
  function(R, PlayerSvc) {
    return {
      restrict    : 'E',
      scope       : {
        playerId : '@'
      },
      templateUrl : '/views/partials/player-profile',
      link        : function(scope, element, attrs) {
        PlayerSvc.resources.playerById.get({playerId : scope.playerId}, function(response) {
          var player  = R.prop('data', response),
              getProp = R.prop(R.__, player);

          scope.name     = getProp('name');
          scope.username = getProp('username');
        }, function(err) {
          alert('ERROR = ' + JSON.stringify(err));
        });
      }
    };
  }]);
