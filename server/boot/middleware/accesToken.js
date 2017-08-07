/**
 * Middleare set an get token header
 */

module.exports = (req, res, next) => {
  res.setAccesToken = (accesToken) => {
    res.setHeader('X-Access-Token', `auth: ${accesToken}`)
  }
  req.getAccesToken = () => {
    let auth = req.headers['X-Access-Token']
    let i = auth.indexOf(':') + 1
    return auth.substr(i, auth.length)
  }
  next()
}
