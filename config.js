/**
 * We leave `rc` responsible for loading and merging the various configuration
 * sources.
 */
var logger = require('./utils/Logger');


var nodeEnv = 'local';

logger.info("Using config.env["+nodeEnv+"]");

var config = require('rc')('loopback', {
  name: 'vizuri_loopback',
  env: nodeEnv
});


if (!config[nodeEnv]) {

    logger.error("Did not find a proper database environment for config: " + JSON.stringify(config, null, 2));
    config[nodeEnv] = {};
}
else{
    logger.info("Using config: " + JSON.stringify(config[nodeEnv], null, 2));
}


module.exports = config;
