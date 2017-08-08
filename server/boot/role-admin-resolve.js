module.exports = function(app) {
  let Role = app.models.Role;
  let perm = app.models.permissions

  Role.registerResolver('admin', function(role, context, cb) {
    if (context.req)  console.log(`url -- ${context.req.path}`)
    // Q: Is the current request accessing a Project?
    if (context.modelName !== 'user') {
      // A: No. This role is only for projects: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    let userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    permissions.find({where: {userId: userId}}, (err, res) => {
      if(err) return cb(err)
      if (res.length === 0) {
        cb(null, true)
      }
    })
  })
}