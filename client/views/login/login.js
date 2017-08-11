(function() {
  'use strict';

  angular.module('view.login', [])

  .controller('loginCtrl', ['$scope','$queryServer', '$session','$location' ,function($scope, $queryServer, $session,$location) {
    $scope.patronEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.user = {}
    $scope.runLogin = function () {
      if ($scope.login.$valid) {
        $queryServer.login($scope.user).then(function (data) {
          $session.setSession(data.data)
          $location.path($session.getPath())
        })
      }
    }
    $scope.goSignUp = function () {
       $location.path('/signUp')
    }

  }]);
})();