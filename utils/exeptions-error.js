/**
 * Managmen Erros
 */

class excepionError {
  const err = {
    401 : {
      descrition: "Not have session",
      menssage: "You not have Session, please login",
    }
  }
  constructor () {
  }

  error(err, res, message, callback){

  }
}

module.exports = excepionError
