const passport = require('passport')

exports.onlyAuthUser = passport.authenticate('jwt', {session: false})

// Only for session AUTH!
/* exports.onlyAuthUser = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next()
  }

  return res.status(401).send({errors: {auth: 'Not Authenticated!'}})
} */