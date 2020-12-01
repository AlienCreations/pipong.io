var R              = require('ramda'),
    config         = require('config'),
    request        = require('dupertest'),
    createLocation = require('../../../../server/controllers/api/location/createLocation'),
    commonMocks    = require('../../../_helpers/commonMocks');

var locationData         = {
      name : 'New Location',
      uri  : 'new-location'
    },
    locationDataResponse = R.omit(['id'], locationData),
    incompleteData   = {
      uri : 'foo'
    };

describe('createLocation controller', function() {
  it('returns locationData when creating a location with all correct params', function(done) {
    request(createLocation)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .body(locationData)
      .expect(commonMocks.makeJsonResponse(200, locationDataResponse), done);
  });

  it('throws an error when creating a location with incomplete params', function(done) {
    request(createLocation)
      .extendReq(commonMocks.COMMON_REQUEST_BODY)
      .extendRes(commonMocks.COMMON_RESPONSE_BODY)
      .body(incompleteData)
      .expect(commonMocks.makeJsonResponse(501, R.createMapEntry('err', commonMocks.missingParamErr('name'))), done);
  });
});
