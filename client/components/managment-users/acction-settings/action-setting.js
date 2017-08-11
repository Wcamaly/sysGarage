(function() {
  'use strict';

  angular.module('directive.actions.settings', [])

    .directive('appAction', [function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: './components/managment-users/acction-settings/action-setting.html',
        controller: ['$scope', '$queryServer', '$session', '$mdToast', function($scope, $queryServer, $session, $mdToast) {
          $scope.perm = {
            user: $scope.user
          }
          if (!$session.getExtra('permDeault')) {
            $queryServer.getDefaultPermissions().then(function(res) {
              setDefault(res.data.data)
              $session.setExtra('permDeault', res.data.data)
            })
          } else {
            setDefault($session.getExtra('permDeault'))
          }

          function setDefault(listAcc) {
            if ($scope.user.permission.length === 0) {
              var aux = _.find(listAcc, function(o) {
                return o.name === $scope.user.role[0].name
              })
              $scope.user.permission = _.concat($scope.user.permission, aux.actions)
            }
          }

          $scope.configPerm = function() {
            $queryServer.managmentPermission($scope.perm).then(function(res) {
              console.log(res)
              if (res.data.status === 'Ok') {
                var toast = $mdToast.simple()
                  .textContent(res.data.message)
                  .highlightAction(true)
                  .highlightClass('md-warn')
                  .position("bottom right");

                $mdToast.show(toast);
              }
            })

          }

          $scope.initPerm = function(per) {
            return per.status != undefined ? per.status : true
          }

        }],
        scope: {
          user: '='
        }
      }
    }]);
})()