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
            $scope.viewlis = [];
            $queryServer.listUser({userId: $session.getId()}).then(function (res) {
                $scope.loading = false;
                $scope.listUser = res.data.data;
            })

            $scope.show = function (v) {
                $scope.viewlis[v] = !$scope.viewlis[v];
            }
          }]
        }
    }]);
})()