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
    secret : R.path(['env', 'SESSION_SECRET'], process)
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
    pipongDb : {
      connectionLimit : 10,
      host            : 'localhost',
      user            : R.path(['env', 'MYSQL_USER'], process),
      password        : R.path(['env', 'MYSQL_PASSWORD'], process),
      database        : R.path(['env', 'MYSQL_DATABASE'], process)
    }
  },

  redis : {
    client   : 'redis',
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
        clientId     : R.path(['env', 'FACEBOOK_APP_ID'], process),
        clientSecret : R.path(['env', 'FACEBOOK_APP_SECRET'], process),
        callbackUrl  : 'https://www.pipong.io/auth/facebook/callback'
      }
    }
  }

};

console.log('USING PRODUCTION CONFIG');
