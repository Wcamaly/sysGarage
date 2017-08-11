(function () {
   angular.module('myApp.factory.session', [])
  .factory ('$session', ['localStorageService' , function (localStorageService) {
    var session= {}
    var extra = {}
    function setSession (sess) {
      session = sess
      localStorageService.set('session', session)
    }
    function getPath () {
      return '/'+session.role[0].name
    }
    function getRole () {
      console.log(session.role)
      return session.role[0].name
    }
    function getId () {
      return session.id
    }
    function getPermissions () {
      return session.permissions
    }
    function getusername () {
      return session.username
    }
    function clear () {
      session = {}
      localStorageService.remove('session')
    }
    function setExtra (key, obj) {
      extra[key] = obj
    }
    function getExtra (key){
      return extra[key]
    }


    if (localStorageService.get('session')) {
      session = localStorageService.get('session')
    }
    return {
      setSession: setSession,
      getPath: getPath,
      getRole: getRole,
      getId: getId,
      getPermissions: getPermissions,
      getusername: getusername,
      clear :clear,
      setExtra: setExtra,
      getExtra: getExtra
    }

  }])
})()