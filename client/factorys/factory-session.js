 angular.module('myApp.factory.session', [])
  .factory ('$session', [ function () {
    var session= {}
    function setSession (sess) {

      session = sess
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
    }
    return {
      setSession: setSession,
      getPath: getPath,
      getRole: getRole,
      getId: getId,
      getPermissions: getPermissions,
      getusername: getusername,
      clear :clear
    }

  }])