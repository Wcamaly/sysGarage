'use strict'
const Utils = require('../../utils/utils')

module.exports = (Primenumber) => {
  /**
   * Method for calc num prime
   * @param  Number num Number from calc
   * @return Number  num   same number
   * @return boolean  prime response a question it number is prime ?
   */
  Primenumber.calcPrime = (number, cb) => {
    let obj = {
      number: number,
      prime: Utils.primeNumber(number)
    }
    cb(null, obj)
  }
  Primenumber.remoteMethod('calcPrime', {
    accepts: {arg: 'number', type: 'number'},
    returns: [
      {arg: 'number', type: 'number', root: true},
      {arg: 'prime', type: 'boolean', root: true}
    ],
    http: {path: '/calcPrime', verb: 'post'}
  })

  Primenumber.afterRemote('**', (ctx, prime, next) => {
    ctx.result = {
      data: ctx.result
    }
    next()
  })
}
