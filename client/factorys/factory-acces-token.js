 angular.module('myApp.factory.access.token', [])
  .factory ('$accessToken', [function () {
    var accesToken= null
    function setAccesToken (data) {
      var auth = data.headers('X-Access-Token')
      console.log(auth)
      var i = auth.indexOf(':') + 1
      accesToken = auth.substr(i, auth.length)
    }
    function generatedUrl (url) {
      return accesToken ? url+'?access_token='+accesToken : url;
    }
    return {
      setAccesToken: setAccesToken,
      generatedUrl: generatedUrl
    }

  }])