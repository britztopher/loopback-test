/**
 * Dependencies
 */

var loopback = require('loopback');
var config = require('../config');
var logger = require('../utils/Logger');

// Use the memory connector by default.
var DB = 'mongodb';

logger.info("Using the ["+DB+"] connector");

// Load the environmental settings for this database.
config = config[config.env][DB];

if (!config) {
  config = {};
}

switch (DB) {
  case 'mongodb':
    var m = 'loopback-connector-' + DB;
      logger.info("Using the " + m + " connector.");
    try {
      config.connector = require(m);
    }
    catch (e) {
        logger.error("could not require " + m, e);
        logger.error('make sure it is listed in package.json');
        logger.error('then run');
        logger.error('  npm install');

      throw e;
    }
  break;
  default:
    config.connector = loopback.Memory;
  break;
}

try {
  module.exports = loopback.createDataSource(config);
}
catch (e) {
    logger.error('Error while initializing the data source:', e);

    logger.error('\nPlease check your configuration settings and try again.');
   process.exit(1);
}
