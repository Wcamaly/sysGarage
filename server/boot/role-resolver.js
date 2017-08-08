module.exports = function(app) {
  app.on('started', () => {
      let Role = app.models.role;


      Role.find({}, (err, roles) => {
        if (err) throw err
        roles.forEach((val, i) => {
          Role.registerResolver(val.name, function(role, context, cb) {
            roleReolve(val.name, role, context, cb)
          })
        })
      })
  })


  function roleReolve (nameRole, role, context, cb) {
    let perm = app.models.permissions
    // console.log(`Role --- ${context.modelName.toLowerCase()}   ----- ${nameRole.toLowerCase()}`)
    // if (context.modelName.toLowerCase() !== 'user') {
    //   console.log('modaleNAme Error')
    //   return process.nextTick(() => cb(null, false));
    // }

    let userId = context.accessToken.userId;
    if (!userId) {
      console.log('TOken Error')
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    perm.find({
      where: {userId: userId},
      inlcude: {
        relation: 'actions'
      }
    }, (err, res) => {
      console.log(`err -- ${err} --res ${JSON.stringify(res)}`)
      if(err) return cb(err)
      if (res.length === 0) {
        console.log('---------------------')
        return cb(null, true)
      } else {
        let property = context.property
        let i = 0
        while (i < res.length) {
          console.log(`${res[i].actions.actionName}`)
          if( res[i].actions.actionName === property)
            return cb(null, res[i].status)
          i++
        }
        cb(null, true)
      }
    })
  }
}