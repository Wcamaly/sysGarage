(function () {
   angular.module('myApp.factory.access.token', [])
  .factory ('$accessToken', ['localStorageService', '$location' , function (localStorageService, $location) {
    var accesToken= null
    function setAccesToken (data) {
      var auth = data.headers('X-Access-Token')
      if (auth){
        var i = auth.indexOf(':') + 2
        accesToken = auth.substr(i, auth.length)
        localStorageService.set('accesToken', accesToken)
      }
    }
    function getAccessToken () {
      return accesToken
    }
    function generatedUrl (url) {
      return accesToken ? url+'?access_token='+accesToken : url;
    }
    function clear () {
      accesToken = null
      localStorageService.remove('accesToken')
    }


    if (localStorageService.get('accesToken')) {
      accesToken = localStorageService.get('accesToken')
    }else {
      $location.path('/login')
    }

    return {
      setAccesToken: setAccesToken,
      generatedUrl: generatedUrl,
      clear : clear,
      getAccessToken: getAccessToken
    }

  }])
})()