'use strict'
const Utils = require('../../utils/utils')

module.exports = (Primenumber) => {
  /**
   * Method for calc num prime
   * @param  Number num Number from calc
   * @return Number  num   same number
   * @return boolean  prime response a question it number is prime ?
   */
  Primenumber.calcPrime = (num, cb) => {
    Primenumber.create({
      num: num,
      prime: Utils.primeNumber(num)
    }, (err, data) => {
      if (err) return cb(err)
      cb(data)
    })
  }
  Primenumber.remoteMethod('calcPrime', {
    returns: [
      {arg: 'num', type: 'number'},
      {arg: 'prime', type: 'boolean'}
    ],
    http: {path: '/calcPrime', verb: 'post'}
  })
}
