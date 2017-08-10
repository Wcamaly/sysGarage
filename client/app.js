'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial',
  'myApp.const',
  'myApp.querys',
  'myApp.factory.error',
  'myApp.factory.access.token',
  'myApp.factory.session',
  'view.login',
  'view.admin',
  'view.client'

]).
config(['$locationProvider', '$routeProvider','$mdThemingProvider' , function($locationProvider, $routeProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('!');
  $mdThemingProvider.theme('default').dark()
  $routeProvider.when('/login', {
      templateUrl: './views/login/login.html',
      controller: 'loginCtrl'
  })
  $routeProvider.when('/admin', {
      templateUrl: './views/role/admin/admin.html',
      controller: 'adminCtrl'
  })
  $routeProvider.when('/client', {
      templateUrl: './views/role/client/client.html',
      controller: 'clientCtrl'
  })
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
