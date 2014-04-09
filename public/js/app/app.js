'use strict';

// Declare app level module which depends on filters, and services

var myApp = angular.module('myApp', [
    'myApp.controllers',
    'lbServices',
    'ui.bootstrap',
    'ngRoute'
]);
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/init/login',
            controller: 'LoginCtrl'
        }).
        when('/home', {
            templateUrl: 'partials/index.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(false);     // false = use html hash tags
}]);




