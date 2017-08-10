'use strict';

angular.module('directive.calcualtor', [])
.directive('appCalculator', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/components/calculator/calculator.html',
    controller: ['$scope','$queryServer',function ($scope, $queryServer) {


      $scope.calculator = function () {
        if ($scope.calcu.$valid) {
          $scope.activated = true
          console.log($scope.cal)
          $queryServer.calculatorPrime($scope.cal).then(function (res) {
            $scope.resultView = true;
            $scope.activated = false;
            $scope.result = res.data.data.prime

          })
        }
      }
      $scope.again  = function () {
        $scope.activated = false;
        $scope.resultView = false;
        $scope.result = null;
      }

      $scope.again()
    }]
  }
});