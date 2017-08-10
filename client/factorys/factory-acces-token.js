 angular.module('myApp.factory.access.token', [])
  .factory ('$accessToken', [function () {
    var accesToken= null
    function setAccesToken (data) {
      var auth = data.headers('X-Access-Token')
      if (auth){
        var i = auth.indexOf(':') + 2
        accesToken = auth.substr(i, auth.length)
      }
    }
    function generatedUrl (url) {
      return accesToken ? url+'?access_token='+accesToken : url;
    }
    function clear () {
      accesToken = null
    }
    return {
      setAccesToken: setAccesToken,
      generatedUrl: generatedUrl,
      clear : clear
    }

  }])