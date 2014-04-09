var module =  angular.module('lbServices', ['ngResource']);

module
    .factory('LoopBackAuth', function () {
        return {
            accessTokenId: null
        };
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');

    })
    .factory('LoopBackAuthRequestInterceptor', [ '$q', '$location', 'LoopBackAuth',
        function ($q, $location, LoopBackAuth) {
            return {
                'request': function (config) {

                    /*  console.log("token["+window.localStorage.getItem('accessToken')+"], accessTokenId["+LoopBackAuth.accessTokenId+"], config.headers: ", config.headers);
                    if (LoopBackAuth.accessTokenId) {
                        config.headers.authorization = LoopBackAuth.accessTokenId;
                    }
                    */

                    // check session timeout
                   /* var now = new Date();
                    var tokenTimeout = 0;

                    if (){

                    }
                    */

                    if (window.localStorage.getItem('accessToken')) {

                       // console.log("token["+window.localStorage.getItem('accessToken')+"], config.headers: ", config.headers);
                        config.headers.authorization = window.localStorage.getItem('accessToken');
                    }
                    return config || $q.when(config);
                }
                ,
                responseError: function(rejection) {

                    console.log("Found responseError: ", rejection);
                    if (rejection.status == 401) {

                        console.log("Access denied (error 401), please login again");
                        //$location.nextAfterLogin = $location.path();
                        $location.path('/init/login');
                    }
                    return $q.reject(rejection);
                }
            }
        }])
    .factory('LoopBackResource', [ '$resource', function ($resource) {
        return function (url, params, actions) {

            var resource = $resource(url, params, actions);

            // Angular always calls POST on $save()
            // This hack is based on
            // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
            resource.prototype.$save = function (success, error) {
                // Fortunately, LoopBack provides a convenient `upsert` method
                // that exactly fits our needs.
                var result = resource.upsert.call(this, {}, this, success, error);
                return result.$promise || result;
            }

            return resource;
        };
    }]);
