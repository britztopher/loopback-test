var loopback = require('loopback')
    , db = require('../data-sources/db');


var User = module.exports = loopback.User.extend(
    'users'
);

User.attachTo(db);
loopback.AccessToken.attachTo(db);
loopback.ACL.attachTo(db);
loopback.Role.attachTo(db);
loopback.RoleMapping.attachTo(db);
User.hasMany(loopback.AccessToken, {as: 'accessTokens'});

