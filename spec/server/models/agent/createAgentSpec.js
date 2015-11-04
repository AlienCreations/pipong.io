'use strict';

var R = require('ramda');

var createAgent = require('../../../../server/models/agent/methods/createAgent'),
    commonMocks = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337;

var FAKE_NAME              = 'Test Provider 3',
    FAKE_AUD               = 'x41d8cd98f00b204e9800998ecf8427x',
    FAKE_SECRET            = 'x8f5f167f44f4964e6c998dee827110x',
    FAKE_STATUS            = 1,
    FAKE_NAME_TOO_SHORT    = 'a',
    FAKE_NAME_TOO_LONG     = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    FAKE_MALFORMED_AUD     = 'asdf',
    FAKE_MALFORMED_SECRET  = 'asdf';

var makeFakeAgentData = function(includeOptional) {
  var fakeRequiredAgentData = {
    name   : FAKE_NAME,
    aud    : FAKE_AUD,
    secret : FAKE_SECRET
  };

  var fakeOptionalAgentData = {
    status : FAKE_STATUS
  };

  return includeOptional ? R.merge(fakeOptionalAgentData, fakeRequiredAgentData) : fakeRequiredAgentData;
};

var fullAgentDataForQuery     = makeFakeAgentData(true),
    requiredAgentDataForQuery = makeFakeAgentData(false);

var fullAgentDataSwapIn = commonMocks.override(fullAgentDataForQuery);

describe('createAgent', function() {

  it('creates a agent record when given expected data for all fields', function(done) {
    createAgent(fullAgentDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('creates a agent record when given expected data for only required fields', function(done) {
    createAgent(requiredAgentDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('throws an error when given an unsupported parameter', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('foo', 'bar'));
    }).toThrow(commonMocks.unsupportedParamErr('foo'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('name', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when name is missing', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('name', undefined));
    }).toThrow(commonMocks.missingParamErr('name'));
  });

  it('throws an error when name is too short', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('name', FAKE_NAME_TOO_SHORT));
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when name is too long', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('name', FAKE_NAME_TOO_LONG));
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when given an aud of type other than String', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('aud', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when aud is missing', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('aud', undefined));
    }).toThrow(commonMocks.missingParamErr('aud'));
  });

  it('throws an error when aud is malformed', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('aud', FAKE_MALFORMED_AUD));
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when given an secret of type other than String', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('secret', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('secret'));
  });

  it('throws an error when secret is missing', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('secret', undefined));
    }).toThrow(commonMocks.missingParamErr('secret'));
  });

  it('throws an error when secret is malformed', function() {
    expect(function() {
      createAgent(fullAgentDataSwapIn('secret', FAKE_MALFORMED_SECRET));
    }).toThrow(commonMocks.illegalParamErr('secret'));
  });

});
