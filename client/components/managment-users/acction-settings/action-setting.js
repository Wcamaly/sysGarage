(function() {
    'use strict';

    angular.module('directive.actions.settings', [])

    .directive('appAction', [function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './components/managment-users/acction-settings/action-setting.html',
            controller: ['$scope','$queryServer','$session','$mdToast',function ($scope, $queryServer, $session, $mdToast) {
                $scope.perm = {
                  user: $scope.user
                }

                $queryServer.getDefaultPermissions().then(function (res) {
                  if ($scope.user.permission.length === 0) {

                    var aux = _.find(res.data, function (o) { return o.name === $scope.user.role[0].name})

                    console.log(aux.actions)
                    $scope.user.permission = _.concat($scope.user.permission, aux.actions)
                  }
                })


                $scope.configPerm = function () {
                  $queryServer.managmentPermission($scope.perm).then(function (res) {
                    console.log(res)
                    if (res.data.status === 'Ok'){
                        var toast =$mdToast.simple()
                          .textContent(res.data.message)
                          .highlightAction(true)
                          .highlightClass('md-warn')
                          .position("bottom right");

                        $mdToast.show(toast);
                    }
                    //if ()
                  })

                }

                $scope.initPerm = function (per) {
                   return per.status != undefined ?per.status : true
                }

              }],
            scope: {
                user: '='
            }
        }
    }]);
})()

