(function() {
  'use strict'

  angular.module('myApp.factory.error', [])
  .factory('$error', [function(){
      function errorHandler (err) {


      }
    return {
      errorHandler:errorHandler
    }
  }])
})()