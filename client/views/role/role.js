'use strict';

angular.module('view.role', ['directive.calcualtor','directive.managment.user'])

.controller('roleCtrl', ['$scope','$session','$queryServer','$accessToken','$location',
  function($scope, $session, $queryServer, $accessToken, $location) {
    var role = $session.getRole();
    $scope.urlTemplate = './views/role/'+role+'/'+role+'.html';
    console.log($scope.urlTemplate)
    $scope.username = $session.getusername();
    $scope.logout = function () {
      $queryServer.logout().then(function () {
        $session.clear();
        $accessToken.clear();
        $location.path('/login')

      })
  }
}]);