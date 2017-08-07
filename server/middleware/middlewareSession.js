/**
 * Verify if user is login
 */

module.exports = (req, res, next) => {
  if (!req.accessToken) {
    return res.sendStatus(401)
  }
  next()
}
