'use strict';

angular.module('directive.blocked', [])

.directive('appBlocked', [function() {
     return {
    restict: 'E',
    urlTemplate: './blocked.html',
    controller: ['$scope','$queryServer',function ($scope, $queryServer) {

      }]
    }
}]);