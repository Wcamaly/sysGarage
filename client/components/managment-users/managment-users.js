(function() {
    'use strict';

    angular.module('directive.managment.user', ['directive.actions.settings'])

    .directive('appMuser', [function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: '/components/managment-users/managment-users.html',
        controller: ['$scope','$queryServer','$session',function ($scope, $queryServer, $session) {
            $scope.loading = true;
            $scope.listUser = []
            var viewlis = [];
            $queryServer.listUser({userId: $session.getId()}).then(function (res) {
                $scope.loading = false;
                $scope.listUser = res.data;
            })

            $scope.show = function (v) {
                $scope.view[v] = $scope.view[v] ? false : true;
            }

            $scope.view = function (v) {
                return viewlis[v]
            }
          }]
        }
    }]);
})()