/**
 * Module Dependencies
 */

var loopback = require('loopback')
    , db = require('../data-sources/db')
    , User = require('./user')
    , Model = require('loopback').Model
    , Role = require('loopback').Role
    , ACL = require('loopback').ACL
    , logger = require('../utils/Logger');

var properties = {
    userId : {type: String}
    ,firstName: {type: String}
    , lastName: {type: String}
    , email: {type: String}
    , dob: {type: String}
    , age: {type: Number}
    , income: {type: Number}
    , cash: {type: Number}
    , debt: {type: Number}
    , creditRating: {type: Number}

};


var options = {
    // By default, access will be denied if no matching ACL entry is found
    defaultPermission: ACL.DENY,
    // Model level ACLs
    acls: [
        {
            principalType: ACL.ROLE,
//            principalId: Role.AUTHENTICATED,
            principalId: Role.EVERYONE,
            permission: ACL.ALLOW,
            property: 'test_authorized'    // evaluate
        }
    ]
};

/**
 * customer Modeostl
 */

//var Customer = module.exports = loopback.User.extend(

var Customer = module.exports = loopback.Model.extend(
  'customer',   // name of table in mongo
    properties,
    options
);

// attach to the db
Customer.attachTo(db);

// link customer with access tokens
//Customer.hasMany(AccessToken, {as: 'accessTokens', foreignKey: 'userId'});

Customer.belongsTo(User);
//Customer.belongsTo(User, {as: 'user', foreignKey: 'userId'});


Customer.test_authorized = function(customer, cb){

    cb(null, {testResult: "did I break it?"})

}

Customer.beforeRemote('findOne', function(ctx, inst, next) {

    logger.info("Inside findOne:beforeRemote");

    next();
});

Customer.beforeRemote('login', function(ctx, inst, next) {

    logger.info("Inside findOne:login");

    next();
});

Customer.setup = function () {
    // We need to call the base class's setup method
    Model.setup.call(this);
    var CustomerModel = this;

    loopback.remoteMethod(
        CustomerModel.test_authorized,
        {
            accepts: [
                {arg: 'customer', type: 'object', required: true, http: {source: 'body'}}
            ],
            returns: {arg: 'status', type: 'object', root: true},
            http: {verb: 'post'}
        }
    );

    return CustomerModel;

}


/*!
 * Setup the base user.
 */

Customer.setup();