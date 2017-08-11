(function() {
  'use strict'

  angular.module('myApp.factory.error', [])
  .factory('$error', ['$location','$mdDialog',function($location, $mdDialog){
      function errorHandler (err) {
        if (err){
          $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('Error')
                .textContent(err.data.error.message)
                .ok('Ok')
            ).then(function () {$location.path('/login')})
          }

      }
    return {
      errorHandler:errorHandler
    }
  }])
})()