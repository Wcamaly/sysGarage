(function () {
  'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'LocalStorageModule',
  'myApp.const',
  'myApp.querys',
  'myApp.factory.error',
  'myApp.factory.access.token',
  'myApp.factory.session',
  'directive.blocked',
  'view.login',
  'view.role',
  'view.sign.up'

]).
config(['$locationProvider', '$routeProvider','$mdThemingProvider','$mdIconProvider' ,
  function($locationProvider, $routeProvider, $mdThemingProvider, $mdIconProvider) {
    $locationProvider.hashPrefix('!');
    $mdThemingProvider.theme('docs-dark','default').dark()

    $routeProvider.when('/login', {
        templateUrl: './views/login/login.html',
        controller: 'loginCtrl'
    })
    $routeProvider.when('/admin', {
        templateUrl: './views/role/role.html',
        controller: 'roleCtrl'
    })
    $routeProvider.when('/client', {
        templateUrl: './views/role/role.html',
        controller: 'roleCtrl'
    })
    $routeProvider.when('/signUp', {
        templateUrl: './views/sign-up/sign-up.html',
        controller: 'signUpCtrl'
    })
    $routeProvider.otherwise({redirectTo: '/login'});
}]);

})()