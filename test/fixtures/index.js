'use strict'

const fixtures = {
  getUser () {
    return {
      username: 'test',
      password: '1234',
      email: 'test@sysgarage.com',
      userType: 'testing'
    }
  },
  getRole () {
    return {
      name: 'testing',
      description: 'testing user'
    }
  }
}
module.exports = fixtures
