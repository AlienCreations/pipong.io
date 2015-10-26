'use strict';

var R = require('ramda');

/**
 * Transform a Facebook user profile into an object
 * our createPlayer model can use for insertion.
 *
 * @example profile:
 * {
 *   id          : '10207223242196307',
 *   username    : undefined,
 *   displayName : 'Sean Cannon',
 *   name        : {
 *     familyName : 'Cannon',
 *     givenName  : 'Sean',
 *     middleName : undefined
 *   },
 *   gender      : 'male',
 *   profileUrl  : 'https://www.facebook.com/app_scoped_user_id/10207223242196307/',
 *   emails      : [{value : 'alienwebguy@gmail.com'}],
 *   provider    : 'facebook',
 *   _raw        : '{"id":"10207223242196307","email":"alienwebguy\\u0040gmail.com","gender":"male","link":"https:\\/\\/www.facebook.com\\/app_scoped_user_id\\/10207223242196307\\/","locale":"en_US","last_name":"Cannon","first_name":"Sean","name":"Sean Cannon"}',
 *   _json       : {
 *     id         : '10207223242196307',
 *     email      : 'alienwebguy@gmail.com',
 *     gender     : 'male',
 *     link       : 'https://www.facebook.com/app_scoped_user_id/10207223242196307/',
 *     locale     : 'en_US',
 *     last_name  : 'Cannon',
 *     first_name : 'Sean',
 *     name       : 'Sean Cannon'
 *   }
 * }
 * @param profile
 */
var transformFacebookProfile = function(profile) {

  var json        = R.prop('_json', profile),
      getFromJson = R.prop(R.__, json);

  return {
    name  : getFromJson('name'),
    email : getFromJson('email')
  }
};

module.exports = transformFacebookProfile;
