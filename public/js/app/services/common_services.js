angular.module('common_services', ['ngResource']).
    factory('SharedProps',function () {

        console.log("Inside common_services");
        var previousUrl = '';
        var loggedInUser = null;


        return {
            getPreviousUrl: function () {
                return previousUrl;
            },
            setPreviousURL: function(value) {
                previousUrl = value;
            },

            getLoggedInUser: function () {
                return loggedInUser;
            },
            setLoggedInUser: function(user){

                console.log("Inside common_service:setLoggedInUsers");
                loggedInUser = user;
            }
        }
    });