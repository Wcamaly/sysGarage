'use strict'

module.exports = (Actions) => {
  Actions.validatesUniquenessOf('actionName', {message: 'This Action already exists'})
}
