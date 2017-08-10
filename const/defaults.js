/**
 *
 * Values for default
 *
 */
module.exports = {
  userDefault: [{
    username: 'admin',
    email: 'admin@gmail.com',
    password: '1234',
    userType: 'admin'
  },
  {
    username: 'client',
    email: 'client@gmail.com',
    password: 'client',
    userType: 'client'
  }],
  rolesDefault: [{
    name: 'client',
    description: 'Is Role for client'
  }, {
    name: 'admin',
    description: 'Is Role for admin'
  }],
  asignRolePermitionCreateDefault: [{
    role: 'admin',
    crole: ['admin']
  }],
  actionsDefault: [{
    actionName: 'create',
    description: 'Create User Admin'
  },
  {
    actionName: 'calcPrime',
    description: 'Calculater if number is prime'
  },
  {
    actionName: 'managmentPermission',
    description: 'Managment permissions'
  },
  {
    actionName: 'listUsers',
    description: 'Get list User'
  }],
  actionsRoleDefault: {
    'admin': ['create', 'managmentPermission', 'listUsers'],
    'client': ['calcPrime']
  }
}
