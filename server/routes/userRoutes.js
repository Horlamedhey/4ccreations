import {Router} from 'express'
var config = require('../conf')
const User = require('../models/user')
var jwt = require('jsonwebtoken')
const router = Router()
var bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
  User.findOne({'personalInfo.username': req.body.username}, function (err, user) {
    if (err) {
      throw err
    } else if (user) {
      res.status(500).send('Username already exist')
    } else if (!user) {
      let user = new User()
      user.personalInfo = req.body
      user.personalInfo.password = bcrypt.hashSync(req.body.password, 10)

      user.save(function (err, user) {
        if (err) {
          throw err
        }
        user.personalInfo.password = undefined
        return res.json(user)
      })
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
        return res.json({token: jwt.sign({id: user._id}, config.secret, {expiresIn: '24h'})})
      }
    }
  })
})

router.get('/profileAuth', (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decoded) {
      if (err) {
        return res.status(500).send({auth: false, message: 'User not logged in.'})
      }
      User.findById(decoded.id, function (err, user) {
        if (err) {
          return res.status(500).send('There was a problem finding user, please try again.')
        } else if (!user) {
          return res.status(404).send('User not found, please register.')
        } else {
          res.status(200).send(user)
          next(user)
        }
      })
    })
  } else {
    res.status(401).send({auth: false, message: 'Unauthorized access'})
    next()
  }
  // console.log(req.headers.authorization)
  // res.send(['Engr.', 'AbdulGafar Olamide Ajao', 'Horlasco34@gmail.com', '08134549552', 'Nigeria', 'Ogun',
  //   'Abeokuta', 'P.M.B 1515, Unilorin', '19', 'Male', 'Student', 'Unilorin', 'Variable.inc', 'CEO'])
})
export default router
