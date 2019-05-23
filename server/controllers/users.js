const User = require('../models/users');
const passport = require('passport');

exports.getUsers = function(req, res) {
  User.find({})
        .exec((errors, users) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(users);
  });
}

exports.login = function(req, res) {
  const { email, password } = req.body;

  if(!email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  return passport.authenticate('local', (err,passportUser) => {

  })
  
}

exports.register = function(req, res) {
  console.log('hello from register route!!!');
  const registerData = req.body

  if(!registerData.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    })
  }

  if(!registerData.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    })
  }

  if(registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: 'is not the same as confirmation'
      }
    })
  }
  
  const user = new User(registerData);

  user.save((errors, savedUser) => {
    
    if(errors) {
      return res.status(422).json({ errors })
    }

    return res.json(savedUser)

  })
}