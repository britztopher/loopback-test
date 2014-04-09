var urlBase = '/api';

var module = angular.module('userServices', ['ngResource']);

module.factory('LoggedIn', function () {

    var isLoggedIn = false;


    return {
        getIsLoggedIn: function () {
            return isLoggedIn;
        },
        setIsLoggedIn: function (value) {
            isLoggedIn = value;
        }
    }
});

module.factory(
    '$User',
    ['LoopBackResource', 'LoopBackAuth', function (Resource, LoopBackAuth) {

        return Resource(
            urlBase + '/users/:id',
            {id: '@id'},
            {
                "login": {
                    url: urlBase + "/users/login",
                    method: "POST",
                    interceptor: {
                        response: function (response) {

                            console.log("login response", response);
                            var accessToken = response.data;
                            LoopBackAuth.accessTokenId = accessToken.id;
                            return response.resource;
                        },
                        responseError: function(rejection){
                            return rejection.data;
                        }
                    }
                },
                "logout": {
                    url: urlBase + "/users/logout",
                    method: "POST",
                    interceptor: {
                        response: function (response) {
                            console.log("logout response", response);
                        },
                        responseError: function(rejection){
                            console.log("logout rejection", rejection);
                            return rejection.data;
                        }
                    }
                }
            }
        )
    }
    ]);

module.factory(
    '$Customer',
    ['LoopBackResource', 'LoopBackAuth', function (Resource, LoopBackAuth) {

        return Resource(
                urlBase + '/customers/:id',
            {id: '@id'},
            {
                "testAuth": {
                    method: 'POST',
                    url: urlBase + '/customers/test_authorized',
                    interceptor: {
                        response: function (response) {

                            console.log("Have a response", response);
                            //var accessToken = response.data;
                            //LoopBackAuth.accessTokenId = accessToken.id;
                            return response.resource;
                        },
                        responseError: function(rejection){
                            console.log("Have a response error: ", rejection);
                            return rejection.status;
                        }
                    }
                },
            }
        )
    }
    ]);

