import {Router} from 'express'
var config = require('../conf')
const User = require('../models/user')
var jwt = require('jsonwebtoken')
const router = Router()
router.post('/register', (req, res) => {
  let user = {
    personalInfo: {
      title: req.body.title,
      name: req.body.name,
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      status: req.body.status,
      password: req.body.password,
      nationality: req.body.nationality,
      state: req.body.state,
      city: req.body.city,
      newsletter: req.body.newsletter
    }
  }
  User.create(user, function (err, user) {
    if (err) {
      if (/username/.test(err.message)) {
        res.send({message: 'Username already taken', icon: 'mdi-account-alert', color: 'error'})
      } else if (/email/.test(err.message)) {
        res.send({message: 'Email already taken', icon: 'mdi-account-alert', color: 'error'})
      }
    } else {
      let {username, picture} = user.personalInfo
      let data = {username, picture}
      req.session.user = jwt.sign({id: user._id}, config.secret, {expiresIn: '4h'})
      return res.status(200).send({message: 'Voila!!! Registered Successfully!!!', icon: 'mdi-account-check', color: 'success', info: data})
    }
  })
})
router.post('/login', (req, res) => {
  User.findOne({'personalInfo.username': req.body.username}, function (err, user) {
    if (err) { throw err }
    if (!user) {
      res.send({status: 'error', message: 'Login failed. User not found.'})
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.send({status: 'error', message: 'Login failed. Incorrect Password'})
      } else {
        let {username, picture} = user.personalInfo
        let data = {username, picture}
        req.session.user = jwt.sign({id: user._id}, config.secret, {expiresIn: '4h'})
        res.status(200).send({message: 'User Successfully Authenticated. Logging In...', info: data})
      }
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.send({success: false, message: 'Unable to log you out, please try again.'})
    } else {
      res.status(200).send('logging out...')
    }
  })
})

router.get('/profileAuth', (req, res) => {
  if (req.session && req.session.user) {
    jwt.verify(req.session.user, config.secret, function (err, decoded) {
      if (err) {
        return res.send({auth: false, message: 'Unable to verify user.'})
      }
      User.findById(decoded.id, function (err, user) {
        if (err) {
          return res.send({auth: false, message: 'There was a problem finding user, please try again.'})
        } else if (!user) {
          return res.send({auth: false, message: 'User not found, please register.'})
        } else {
          res.status(200).send(user)
        }
      })
    })
  } else {
    res.send({auth: false, message: 'User not logged in.'})
  }
})
export default router
