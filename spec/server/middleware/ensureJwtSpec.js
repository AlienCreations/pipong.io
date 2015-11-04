'use strict';

var R         = require('ramda'),
    ensureJwt = require('../../../server/middleware/ensureJwt');

var _makeFakeReq = function(token) {
  return {
    headers : {
      authorization : 'Bearer ' + token
    }
  };
};

var ERROR_MESSAGE_UNKNOWN  = 'Unknown agent',
    ERROR_MESSAGE_EXPIRED  = 'jwt expired',

    // Expires in 2050
    FAKE_JWT_KNOWN_AGENT   = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkNDFkOGNkOThmMDBiMjA0ZTk4MDA5OThlY2Y4NDI3ZSIsIm5hbWUiOiJUZXN0IFByb3ZpZGVyIDEiLCJleHAiOjI1NTA1NTMyMDB9.osHyw_Zg6sdUuYzXys3aqHTYZjFbSApmFTDDD5DITMQ',
    FAKE_JWT_UNKNOWN_AGENT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJYNDFkOGNkOThmMDBiMjA0ZTk4MDA5OThlY2Y4NDI3WCIsIm5hbWUiOiJUZXN0IFByb3ZpZGVyIDEiLCJleHAiOjI1NTA1NTMyMDB9.SviJ1Wf-ddOjuFasgV1IVtraXzZOM0h_I1OEtzUCvkQ',

    // Expired in 1970
    FAKE_JWT_EXPIRED       = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkNDFkOGNkOThmMDBiMjA0ZTk4MDA5OThlY2Y4NDI3ZSIsIm5hbWUiOiJUZXN0IFByb3ZpZGVyIDEiLCJleHAiOjI1NTA1NTMyfQ.fcHnkk8soU8HjljfGfwsshN15Ois6ALCszhlPNTLB1M',

    FAKE_REQ_KNOWN_AGENT   = _makeFakeReq(FAKE_JWT_KNOWN_AGENT),
    FAKE_REQ_UNKNOWN_AGENT = _makeFakeReq(FAKE_JWT_UNKNOWN_AGENT),
    FAKE_REQ_EXPIRED       = _makeFakeReq(FAKE_JWT_EXPIRED),

    FAKE_RES,
    FAKE_NEXT;

describe('ensureJwt middleware', function() {

  beforeEach(function() {
    FAKE_RES  = jasmine.createSpyObj('res', ['send']);
    FAKE_NEXT = jasmine.createSpy();
  });

  it('sends a 401 when agent is not found', function(done) {
    ensureJwt(FAKE_REQ_UNKNOWN_AGENT, FAKE_RES, FAKE_NEXT);
    setTimeout(function() {
      expect(FAKE_RES.send).toHaveBeenCalledWith(401, ERROR_MESSAGE_UNKNOWN);
      done();
    }, 50);
  });

  it('sends a 401 when token is expired', function(done) {
    ensureJwt(FAKE_REQ_EXPIRED, FAKE_RES, FAKE_NEXT);
    setTimeout(function() {
      expect(FAKE_RES.send).toHaveBeenCalledWith(401, ERROR_MESSAGE_EXPIRED);
      done();
    }, 50);
  });

  it('successfully continues if token can be verified', function(done) {
    ensureJwt(FAKE_REQ_KNOWN_AGENT, FAKE_RES, FAKE_NEXT);
    setTimeout(function() {
      expect(FAKE_NEXT).toHaveBeenCalled();
      done();
    }, 50);
  });
});
