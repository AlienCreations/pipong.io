'use strict';

/**
 * @ngdoc function
 * @author seancannon
 * @name pipong.directive.audioLoop
 * @description
 * # audioLoop
 * Uses the Web Audio API instead of HTML5 so we can remove loop gap.
 * Yes, this is required as of 2015.
 */
angular.module('pipong').directive('audioLoop', ['$window', 'R',
  function($window, R) {
    return {
      restrict : 'E',
      scope    : {
        src : '@'
      },
      link : function(scope, element, attrs) {

        var context = new $window.AudioContext(),
            request = new $window.XMLHttpRequest(),
            source  = context.createBufferSource();

        var err = function () { console.error('The request failed.'); };

        var onDecoded = R.curry(function(source, response) {
          console.log('there...');
          source.buffer = response;
          source.start(0);
          source.loop = true;
        });

        source.connect(context.destination);
        request.open('GET', scope.src, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
          console.log('here...');
          context.decodeAudioData(request.response, onDecoded(source), err );
        };
        request.send();
      }
    }
  }]);
