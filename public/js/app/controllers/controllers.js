'use strict';

/* Controllers */

angular.module('myApp.controllers', ['common_services', 'userServices']).

    controller('mainController',function ($route, $log, $rootScope, $scope) {


        //using services for login now instead of low level http calls now
        $scope.moduleName = "login";

        //route["+JSON.stringify($route, null, 4) +"],
        console.log("Inside mainController");

        $scope.showLayoutMenu = function () {

            if (($scope.moduleName == 'static') || ($scope.moduleName == 'tools')) {

                return true;
            }

            return false;
        }


        $scope.$on("$routeChangeSuccess", function () {
            $scope.moduleName = 'not set';

            if ($route.current && $route.current.moduleName) {
                $scope.moduleName = $route.current.moduleName;
            }
        });


    }).
    controller('LoginCtrl',function ($rootScope, $scope, $http, $modal, $location, $User, SharedProps) {


        //using services for login now instead of low level http calls because it is cleaner and has more
        //functionality
        $scope.login = function () {
            console.log("in login scope function")


            $scope.credentials = {
                email: $scope.form.email,
                password: $scope.form.password,
                //ttl: 86400000                 // session timeout - 24 hours in miliseconds
                ttl: 3600000                 // session timeout - 2 min in miliseconds

            };

            $scope.loginResult = $User.login({include: 'user', rememberMe: false}, $scope.credentials,

                function () {
                    console.log('LOGGED IN DATA: ', $scope.loginResult);

                    // TODO make a more robust API call here
                    window.localStorage.setItem('currentUserId', $scope.loginResult.user.id);
                    window.localStorage.setItem('accessToken', $scope.loginResult.id);
                    window.localStorage.setItem('user', $scope.loginResult.user);

                    SharedProps.setLoggedInUser($scope.loginResult.user);

                    var next = $location.nextAfterLogin || '/home';
                    $location.nextAfterLogin = null;
                    $location.path(next);

                    //$location.url('/home')

                },
                function (reason) {

                    $scope.loginError = reason.data.error.message;

                    // TODO do rest call to log bad user IP and email address

                }
            );

        };

    }).

    controller('HomeCtrl',function ($route, $scope, $Customer) {

        var thisCustomer = {"email": "test@test.com", "firstName" : "Chester", "lastName": "Copperpot"};

        $scope.breakLoopback = function(){

            $scope.testResult = $Customer.testAuth(thisCustomer,

                function () {
                    console.log('Customer Result IN DATA: ', $scope.testResult);

                },
                function (reason) {

                    $scope.testResult = reason.data.error.message;

                    // TODO do rest call to log bad user IP and email address

                }
            )



        }

    });
