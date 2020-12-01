(function (angular, R) {
  'use strict';

  /**
   * @ngdoc function
   * @author seancannon
   * @name pipong.service.PlayerSvc
   * @description
   * # PlayerSvc
   * Player API resources
   */
  angular.module('pipong').service('PlayerSvc', ['$resource', '$cacheFactory', 'R',
    function($resource, $cacheFactory, R) {
      var svc = this;

      /**
       * Internal cache to store API responses.
       * @type {{data: *, ttl: number, expires: Date}}
       */
      svc.cache = {
        data    : $cacheFactory('PlayerSvc'),
        ttl     : 3600,
        expires : new Date() // Expired on init so first resource call will seed cache
      };

      svc.resources = {

        /**
         * Find a player by his/her id
         */
        playerById : $resource('/api/v1/player/id/:playerId', null, {
          'get' : {

            /**
             * Request method.
             * @type {String}
             */
            method : 'GET',

            /**
             * Scrub the data before sending it back to the controller.
             * @param data
             * @returns {*}
             */
            transformResponse : function (data) {
              data = JSON.parse(data);
              svc.cache.data.put('player-' + R.prop('id', data), data);
              return data;
            }
          }

        })

      };

      return svc;
    }]);
}(angular, R));
