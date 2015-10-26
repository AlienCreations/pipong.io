'use strict';

var R           = require('ramda'),
    moment      = require('moment'),
    winston     = require('winston'),
    loggerUtils = require('alien-node-winston-utils');

var DEFAULTS = {
  host          : 'localhost',
  socketChannel : 'serialData'
};

module.exports = {

  server : {
    host : R.defaultTo(DEFAULTS.host, R.path(['env', 'HOST'], process)),

    // Ports on which to run node instances. Should be n-1 instances, where n is the number of cores.
    enabledPorts : [3000]
  },

  session : {
    secret : 'dev'
  },

  logging : {
    winston : {
      transports : [
        {
          name          : 'console',
          level         : 'debug',
          timestamp     : loggerUtils.getDateString,
          colorize      : true,
          transportType : 'console'
        }
      ],
      strategies : {
        console : winston.transports.Console
      }
    }
  },

  mysql : {
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'pipong'
  },

  redis : {
    host     : 'localhost',
    port     : 6379,
    password : ''
  },

  errors : {
    db : {
      NO_RESULTS : {
        code    : 6000,
        message : 'No results'
      }
    },
    validation : {
      REQUIRED    : {
        code    : 7000,
        message : 'Missing required property'
      },
      UNSUPPORTED : {
        code    : 7001,
        message : 'Unsupported property'
      },
      VALUE       : {
        code    : 7002,
        message : 'Illegal value for property'
      }
    }
  },

  auth : {
    strategies : {
      facebook : {

        // PiPongTest app
        clientId     : '184150245254542',
        clientSecret : '916297ebc1f56bc636383903689148c5',

        // Resolves to an IP that port-forwards to localhost:3000
        callbackUrl  : 'http://localhost:3000/auth/facebook/callback'
      }
    }
  }

};

console.log('USING DEVELOPMENT CONFIG');
