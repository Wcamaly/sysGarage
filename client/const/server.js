(function() {
  'use strict';

  angular.module('myApp.const',[])
  .constant('SERVER',{
    LOGIN : '/api/users/login',
    LOGOUT: '/api/users/logout',

    CREATE: '/api/users/',
    LISTUSER: '/api/users/listUser',
    MPERMISSION: '/api/users/managmentPermission',

    CALCUPRIME: '/api/users/calcPrime',
    DEFAULTPERM: '/getDefaultRoleActions'
  })

})()