'use strict';

var R             = require('ramda'),
    authUtils     = require('../../../server/utils/auth'),
    commonMocks   = require('../../_helpers/commonMocks');

var FAKE_STR_NO_SPECIAL_CHARS         = 'foo',
    FAKE_STR_WITH_PLUS                = 'foo+',
    FAKE_STR_WITH_SLASH               = 'foo/',

    FAKE_ENCODED_STR_NO_SPECIAL_CHARS = 'Zm9v',
    FAKE_ENCODED_STR_WITH_PLUS        = 'Zm9vKw==',
    FAKE_ENCODED_STR_WITH_SLASH       = 'Zm9vLw==',

    FAKE_ENCODED_STR_SIX              = 'abcdef',
    FAKE_DECODED_STR_SIX              = 'i·\u001dy',
    FAKE_ENCODED_STR_SEVEN            = 'abcdefg',
    FAKE_DECODED_STR_SEVEN            = 'i·\u001dyø',
    FAKE_MALFORMED_ENCODED_STR_FIVE   = 'abcde',
    MALFORMED_ENCODED_STR_ERROR_MESSAGE = 'Illegal base64url string!';

var FAKE_REQ_WITH_HEADER_BEARER = {
  headers : {
    authorization : 'Bearer bar'
  }
};

var FAKE_REQ_WITH_HEADER_OTHER_AND_NO_QUERY_STRING = {
  headers : {
    authorization : 'foo bar'
  }
};
var FAKE_REQ_WITH_HEADER_OTHER_AND_QUERY_STRING = {
  headers : {
    authorization : 'foo bar'
  },
  query   : {
    token : 'foo'
  }
};

var FAKE_REQ_WITH_NO_HEADER_AUTH_AND_QUERY_STRING = {
  headers : {},
  query   : {
    token : 'foo'
  }
};

describe('authUtils', function() {

  describe('urlBase64Encode', function() {
    it('encodes a string with no URL chars', function() {
      expect(authUtils.urlBase64Encode(FAKE_STR_NO_SPECIAL_CHARS)).toBe(FAKE_ENCODED_STR_NO_SPECIAL_CHARS);
    });

    it('encodes a string with a plus', function() {
      expect(authUtils.urlBase64Encode(FAKE_STR_WITH_PLUS)).toBe(FAKE_ENCODED_STR_WITH_PLUS);
    });

    it('encodes a string with a slash', function() {
      expect(authUtils.urlBase64Encode(FAKE_STR_WITH_SLASH)).toBe(FAKE_ENCODED_STR_WITH_SLASH);
    });

    it('returns an empty string when no string is provided', function() {
      expect(authUtils.urlBase64Encode()).toBe('');
    });
  });

  describe('urlBase64Decode', function() {
    it('decodes a Base64 URL encoded string', function() {
      expect(authUtils.urlBase64Decode(FAKE_ENCODED_STR_NO_SPECIAL_CHARS)).toBe(FAKE_STR_NO_SPECIAL_CHARS);
    });

    it('decodes a Base64 URL encoded string with a plus', function() {
      expect(authUtils.urlBase64Decode(FAKE_ENCODED_STR_WITH_PLUS)).toBe(FAKE_STR_WITH_PLUS);
    });

    it('decodes a Base64 URL encoded string with a slash', function() {
      expect(authUtils.urlBase64Decode(FAKE_ENCODED_STR_WITH_SLASH)).toBe(FAKE_STR_WITH_SLASH);
    });

    it('returns an empty string when no string is provided', function() {
      expect(authUtils.urlBase64Decode()).toBe('');
    });

    it('pads and decodes a Base64 URL string where string.length % 4 = 2', function() {
      expect(authUtils.urlBase64Decode(FAKE_ENCODED_STR_SIX)).toBe(FAKE_DECODED_STR_SIX);
    });

    it('pads and decodes a Base64 URL string where string.length % 4 = 3', function() {
      expect(authUtils.urlBase64Decode(FAKE_ENCODED_STR_SEVEN)).toBe(FAKE_DECODED_STR_SEVEN);
    });

    it('pads and decodes a Base64 URL string where string.length % 4 = 1', function() {
      expect(function() {
        authUtils.urlBase64Decode(FAKE_MALFORMED_ENCODED_STR_FIVE);
      }).toThrow(MALFORMED_ENCODED_STR_ERROR_MESSAGE);
    });
  });

  describe('getTokenFromHeaderOrQueryString', function() {
    it('gets token from header', function() {
      expect(authUtils.getTokenFromHeaderOrQueryString(FAKE_REQ_WITH_HEADER_BEARER)).toBe('bar');
    });

    it('gets token from query string when headers.authorization is not a "Bearer " [JWT] and a query string token is provided', function() {
      expect(authUtils.getTokenFromHeaderOrQueryString(FAKE_REQ_WITH_HEADER_OTHER_AND_QUERY_STRING)).toBe('foo');
    });

    it('returns an empty string when headers.authorization is not a "Bearer " [JWT] and a query string token is not provided', function() {
      expect(authUtils.getTokenFromHeaderOrQueryString(FAKE_REQ_WITH_HEADER_OTHER_AND_NO_QUERY_STRING)).toBe('');
    });

    it('gets token from query string when headers.authorization is undefined and a query string is provided', function() {
      expect(authUtils.getTokenFromHeaderOrQueryString(FAKE_REQ_WITH_NO_HEADER_AUTH_AND_QUERY_STRING)).toBe('foo');
    });
  });

});
