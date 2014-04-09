var loopback = require('loopback')
    , path = require('path')
    , app = module.exports = loopback()
    , started = new Date()
    , fs = require('fs')
    , logger = require('./utils/Logger');





// operational dependencies
try {
  require('strong-agent').profile();
  var control = require('strong-cluster-control');
  var clusterOptions = control.loadOptions();

    // if configured as a cluster master, just start controller
    if(clusterOptions.clustered && clusterOptions.isMaster) {
        return control.start(clusterOptions);
    }

} catch(e) {
    logger.error('Could not load operational dependencies:', e);

}



/*
 * 1. Configure LoopBack models and datasources
 *
 * Read more at http://apidocs.strongloop.com/loopback#appbootoptions
 */

app.boot(__dirname);
/*
 * 2. Configure request preprocessing
 *
 *  LoopBack support all express-compatible middleware.
 */

app.configure(function(){

    app.engine('html', require('ejs').renderFile);
    app.set('env', 'development');
    app.set('views', __dirname + '/public/js/app/views');

    app.use(loopback.favicon());
    app.use(loopback.logger(app.get('env') === 'development' ? 'dev' : 'default'));
    app.use(loopback.cookieParser(app.get('cookieSecret')));
    app.use(loopback.token({model: app.models.accessToken}));
    app.use(loopback.bodyParser());
    app.use(loopback.methodOverride());

});




/*
 * EXTENSION POINT
 * Add your custom request-preprocessing middleware here.
 * Example:
 *   app.use(loopback.limit('5.5mb'))
 */

/*
 * 3. Setup request handlers.
 */

// LoopBack REST interface
var apiPath = '/api';
app.use(apiPath, loopback.rest());

// path to all models
var models_path = './models';


//Dynamically loading all mongoose schemas
fs.readdirSync(models_path).forEach(function (file) {
    app.model(require(models_path + '/' + file));
});


// API explorer (if present)
var explorerPath = '/explorer';
var explorerConfigured = false;
try {
    var explorer = require('loopback-explorer');
    app.use(explorerPath, explorer(app, { basePath: apiPath }));
    explorerConfigured = true;
} catch (e) {
    // ignore errors, explorer stays disabled
}

/*
 * EXTENSION POINT
 * Add your custom request-handling middleware here.
 * Example:
 *   app.use(function(req, resp, next) {
 *     if (req.url == '/status') {
 *       // send status response
 *     } else {
 *       next();
 *     }
 *   });
 */


// Bootstrap routes
require('./app-server/api/rest/routes')( app);


// Let express routes handle requests that were not handled
// by any of the middleware registered above.
// This way LoopBack REST and API Explorer take precedence over
// express routes.
app.use(app.router);

// The static file server should come after all other routes
// Every request that goes through the static middleware hits
// the file system to check if a file exists.

app.use(loopback.static(path.join(__dirname, 'public')));


// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

/*
 * 4. Setup error handling strategy
 */

/*
 * EXTENSION POINT
 * Add your custom error reporting middleware here
 * Example:
 *   app.use(function(err, req, resp, next) {
 *     console.log(req.url, ' failed: ', err.stack);
 *     next(err);
 *   });
 */

// The ultimate error handler.
app.use(loopback.errorHandler());






/*
 * 5. Add a basic application status route at the root `/`.
 *
 * (remove this to handle `/` on your own)
 */



/*
 * 6. Enable access control and token based authentication.
 */

var swaggerRemote = app.remotes().exports.swagger;
if (swaggerRemote) swaggerRemote.requireToken = false;

// this anables the ACL on models
app.enableAuth();

/*
 * 7. Optionally start the server
 *
 * (only if this module is the main module)
 */

if(require.main === module) {
  require('http').createServer(app).listen(app.get('port'), app.get('host'),
    function(){

        var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');

        if (explorerConfigured) {
            logger.log('Browse your REST API at %s%s', baseUrl, explorerPath);

        }
        else {
            logger.log('Run `npm install loopback-explorer` to enable the LoopBack explorer');
        }
        logger.log('LoopBack server listening @ %s%s', baseUrl, '/');
    }
  );
}
