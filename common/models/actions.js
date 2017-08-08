'use strict';

module.exports = function(Actions) {
  Actions.validatesUniquenessOf('actionName', {message: 'This Action already exists'})
};
