'use strict';

var R         = require('ramda'),
    passwords = require('../../../server/utils/passwords');

var PLAINTEXT_PASSWORD = 'foo',
    HASHED_PASSWORD    = passwords.makePasswordHash(PLAINTEXT_PASSWORD);

describe('passwords', function() {
  it('makes a password hash', function() {
    expect(R.length(HASHED_PASSWORD)).toBe(60);
  });

  it('matches a password against a hash', function() {
    expect(passwords.passwordMatchesHash(PLAINTEXT_PASSWORD, HASHED_PASSWORD)).toBe(true);
  });
});
