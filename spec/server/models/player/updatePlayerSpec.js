'use strict';

var R      = require('ramda'),
    config = require('config');

var updatePlayer  = require('../../../../server/models/player/methods/updatePlayer'),
    getPlayerById = require('../../../../server/models/player/methods/getPlayerById'),
    commonMocks   = require('../../../_helpers/commonMocks'),
    passwords     = require('../../../../server/utils/passwords');

var A_POSITIVE_NUMBER = 1337,
    A_NEGATIVE_NUMBER = -3,
    A_STRING          = 'foo',
    A_MALFORMED_EMAIL = 'foo@';

var KNOWN_TEST_PLAYER_ID        = 1,
    FAKE_UNKNOWN_PLAYER_ID      = 9999,
    FAKE_PLAYER_UPDATE_NAME     = 'Update name',
    FAKE_PLAYER_UPDATE_USERNAME = 'Update username',
    FAKE_PLAYER_UPDATE_AVATAR_1 = 'update1.png',
    FAKE_PLAYER_UPDATE_AVATAR_2 = 'update2.png',
    FAKE_PLAYER_UPDATE_EMAIL    = 'update@email.com',
    FAKE_PLAYER_UPDATE_PASSWORD = 'upd4d3P45$w0rd';

describe('updatePlayer', function() {

  it('updates a player name when given a string', function(done) {
    updatePlayer({
      id   : KNOWN_TEST_PLAYER_ID,
      name : FAKE_PLAYER_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(R.prop('name', player)).toBe(FAKE_PLAYER_UPDATE_NAME);
          done();
        });
    });
  });

  it('updates a player username when given a string', function(done) {
    updatePlayer({
      id       : KNOWN_TEST_PLAYER_ID,
      username : FAKE_PLAYER_UPDATE_USERNAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(R.prop('username', player)).toBe(FAKE_PLAYER_UPDATE_USERNAME);
          done();
        });
    });
  });

  it('updates a player avatar[1] when given a string', function(done) {
    updatePlayer({
      id       : KNOWN_TEST_PLAYER_ID,
      avatar1 : FAKE_PLAYER_UPDATE_AVATAR_1
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(R.prop('avatar1', player)).toBe(FAKE_PLAYER_UPDATE_AVATAR_1);
          done();
        });
    });
  });

  it('updates a player avatar[2] when given a string', function(done) {
    updatePlayer({
      id       : KNOWN_TEST_PLAYER_ID,
      avatar2 : FAKE_PLAYER_UPDATE_AVATAR_2
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(R.prop('avatar2', player)).toBe(FAKE_PLAYER_UPDATE_AVATAR_2);
          done();
        });
    });
  });

  it('updates a player email when given a string', function(done) {
    updatePlayer({
      id       : KNOWN_TEST_PLAYER_ID,
      email : FAKE_PLAYER_UPDATE_EMAIL
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(R.prop('email', player)).toBe(FAKE_PLAYER_UPDATE_EMAIL);
          done();
        });
    });
  });

  it('updates a player password when given a string', function(done) {
    updatePlayer({
      id       : KNOWN_TEST_PLAYER_ID,
      password : FAKE_PLAYER_UPDATE_PASSWORD
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getPlayerById(KNOWN_TEST_PLAYER_ID)
        .then(function(player) {
          expect(passwords.passwordMatchesHash(FAKE_PLAYER_UPDATE_PASSWORD, R.prop('password', player))).toBe(true);
          done();
        });
    });
  });

  it('fails gracefully when given an unknown player id to update', function(done) {
    updatePlayer({
      id   : FAKE_UNKNOWN_PLAYER_ID,
      name : FAKE_PLAYER_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      updatePlayer({
        id : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      updatePlayer({
        id   : KNOWN_TEST_PLAYER_ID,
        name : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when given a username of type other than String', function() {
    expect(function() {
      updatePlayer({
        id       : KNOWN_TEST_PLAYER_ID,
        username : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('username'));
  });

  it('throws an error when given an avatar[1] of type other than String', function() {
    expect(function() {
      updatePlayer({
        id      : KNOWN_TEST_PLAYER_ID,
        avatar1 : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('avatar1'));
  });

  it('throws an error when given an avatar[2] of type other than String', function() {
    expect(function() {
      updatePlayer({
        id      : KNOWN_TEST_PLAYER_ID,
        avatar2 : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('avatar2'));
  });

  it('throws an error when given an email of type other than String', function() {
    expect(function() {
      updatePlayer({
        id    : KNOWN_TEST_PLAYER_ID,
        email : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given a malformed email', function() {
    expect(function() {
      updatePlayer({
        id    : KNOWN_TEST_PLAYER_ID,
        email : A_MALFORMED_EMAIL
      });
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      updatePlayer();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      updatePlayer({
        id : A_NEGATIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      updatePlayer({
        id : null
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
