 angular.module('myApp.factory.session', [])
  .factory ('$session', [function () {
    var session= {}
    function setSession (sess) {
      session = sess
    }
    function getPath () {
      return '/'+session.role[0].name
    }

    return {
      setSession: setSession,
      getPath: getPath
    }

  }])