(function () {
  'use strict';

angular.module('view.role', ['directive.calcualtor','directive.managment.user'])

.controller('roleCtrl', ['$scope','$session','$queryServer','$accessToken','$location',
  function($scope, $session, $queryServer, $accessToken, $location) {
    var role = $session.getRole();
    $scope.urlTemplate = './views/role/'+role+'/'+role+'.html';
    console.log($scope.urlTemplate)
    $scope.username = $session.getusername();
    $scope.goSignUp = function () {
      $location.path('/signUp')
    }
    $scope.logout = function () {
      $queryServer.logout().then(lg, lg)

    function lg () {
      $session.clear();
      $accessToken.clear();
      $location.path('/login')
    }


  }
}]);
})()