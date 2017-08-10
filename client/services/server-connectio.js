(function() {
  'use strict';

  angular.module('myApp.querys', [])
    .service('$queryServer', ['$http', '$q', 'SERVER','$error','$accessToken' ,function( $http, $q, SERVER, $error, $accessToken) {

      function requestServer(url, obj,cb, callbackError) {
        url = $accessToken.generatedUrl(url)
        var deferred = $q.defer();
        $http.post(url, obj).then(
          function(data) {
            console.log(data)
            $accessToken.setAccesToken(data)
            deferred.resolve(data);
          },
          function(err) {
            if (typeof callbackError === 'function')
              callbackError(err);
            else
              $error.errorHandler(err)
          });

        return deferred.promise;
      }

      return {
        login: function(obj, cb) {
          return requestServer(SERVER.LOGIN, obj ,cb);
        },
        logout: function() {
          return requestServer(SERVER.LOGOUT, null);
        },
        crearUser: function (obj) {
          return requestServer(SERVER.CREATE, obj);
        },
        listUser: function (obj) {
          return requestServer(SERVER.LISTUSER, obj);
        },
        managmentPermission: function (obj) {
          return requestServer(SERVER.MPERMISSION, obj);
        },
        getDefaultPermissions: function () {
          return requestServer(SERVER.DEFAULTPERM, obj);
        },
        calculatorPrime(obj) {
          return requestServer(SERVER.CALCUPRIME, obj);
        }
      }
    }]);
})()