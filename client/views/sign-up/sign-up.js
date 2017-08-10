(function() {
  'use strict';

  angular.module('view.sign.up', [])
  .controller('signUpCtrl', ['$scope','$queryServer', '$session','$location' ,function($scope, $queryServer, $session,$location) {
    $scope.patronEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.user = {}
    $scope.validation = $session.getAccessToken != null ? true: false
    $scope.signUp = function () {
      if ($scope.sign.$valid) {
        $queryServer.crearUser($scope.user).then(function (data) {
          $location.path('/login')
        })
      }
    }
  }])

})()
