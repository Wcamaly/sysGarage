/**
 * Verify if user is login
 */

module.exports = function (req, res, next) {
  if (!req.accessToken){
    return res.sendStatus(401);
  } 
  next();
}

