/**
 * Middleare set an get token header
 */

module.exports = (req, res, next) => {
  /**
   * [description]
   * @param  {[type]} accesToken [description]
   * @return {[type]}            [description]
   */
  res.setAccesToken = (accesToken) => {
    res.setHeader('X-Access-Token', `auth: ${accesToken}`)
  }
  /**
   * [description]
   * @return {[type]} [description]
   */
  req.getAccesToken = () => {
    let auth = req.headers['X-Access-Token']
    let i = auth.indexOf(':') + 1
    return auth.substr(i, auth.length)
  }
  next()
}
