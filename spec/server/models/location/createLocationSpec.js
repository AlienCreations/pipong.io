'use strict';

var R = require('ramda');

var createPlayer  = require('../../../../server/models/player/methods/createPlayer'),
    DB            = require('alien-node-mysql-utils'),
    commonMocks   = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337,
    A_NEGATIVE_NUMBER = -3,
    A_STRING          = 'foo',
    A_MALFORMED_EMAIL = 'foo@';

var FAKE_NAME               = 'John Doe',
    FAKE_USERNAME           = 'Killer',
    FAKE_EMAIL              = 'john@doe.com',
    FAKE_PASSWORD           = '$2a$10$Wraxvne0BeqRE8A7WEC..uaIAo3iKxo6RUim1ko8WmPnHTGLvoCEm',
    FAKE_AVATAR_1           = 'foo.png',
    FAKE_AVATAR_2           = 'bar.png',
    FAKE_WINS               = 0,
    FAKE_LOSSES             = 0,
    FAKE_CREATED_DATE       = '2015-06-01',
    FAKE_CREATED_UNIX_TIME  = 1434386763;

var makeFakePlayerData = function(includeOptional) {
  var fakeRequiredPlayerData = {
    name     : FAKE_NAME,
    username : FAKE_USERNAME,
    email    : FAKE_EMAIL,
    password : FAKE_PASSWORD
  };

  var fakeOptionalPlayerData = {
    avatar1         : FAKE_AVATAR_1,
    avatar2         : FAKE_AVATAR_2,
    wins            : FAKE_WINS,
    losses          : FAKE_LOSSES,
    createdDate     : FAKE_CREATED_DATE,
    createdUnixTime : FAKE_CREATED_UNIX_TIME
  };

  return includeOptional ? R.merge(fakeOptionalPlayerData, fakeRequiredPlayerData) : fakeRequiredPlayerData;
};

var fullPlayerDataForQuery     = makeFakePlayerData(true),
    requiredPlayerDataForQuery = makeFakePlayerData(false);

var fullPlayerDataSwapIn = commonMocks.override(fullPlayerDataForQuery);

describe('createPlayer', function() {
  it('creates a player record when given expected data for all fields', function(done) {
    createPlayer(fullPlayerDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('creates a player record when given expected data for only required fields', function(done) {
    createPlayer(requiredPlayerDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('throws an error when given an unsupported parameter', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('foo', 'bar'));
    }).toThrow(commonMocks.unsupportedParamErr('foo'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('name', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when name is missing', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('name', undefined));
    }).toThrow(commonMocks.missingParamErr('name'));
  });

  it('throws an error when given a username of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('username', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('username'));
  });

  it('throws an error when given an email of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('email', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given a malformed email', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('email', A_MALFORMED_EMAIL));
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when email is missing', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('email', undefined));
    }).toThrow(commonMocks.missingParamErr('email'));
  });

  it('throws an error when given a password of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('password', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('password'));
  });

  it('throws an error when password is not hashed properly', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('password', A_STRING));
    }).toThrow(commonMocks.illegalParamErr('password'));
  });

  it('throws an error when given a primary avatar (avatar1) of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('avatar1', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('avatar1'));
  });

  it('throws an error when given a secondary avatar(avatar2) of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('avatar2', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('avatar2'));
  });

  it('throws an error when given a win count of type other than Number', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('wins', A_STRING));
    }).toThrow(commonMocks.illegalParamErr('wins'));
  });

  it('throws an error when given a win count below zero', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('wins', A_NEGATIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('wins'));
  });

  it('throws an error when given a loss count of type other than Number', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('losses', A_STRING));
    }).toThrow(commonMocks.illegalParamErr('losses'));
  });

  it('throws an error when given a loss count below zero', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('losses', A_NEGATIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('losses'));
  });

  it('throws an error when given a createdDate of type other than String', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('createdDate', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdDate as a string in a format other than YYYY-MM-DD', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('createdDate', '12-05-1979'));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdUnixTime of type other than Number', function() {
    expect(function() {
      createPlayer(fullPlayerDataSwapIn('createdUnixTime', '1234567890'));
    }).toThrow(commonMocks.illegalParamErr('createdUnixTime'));
  });
});
