import {Router} from 'express'
// import expressJwt from 'express-jwt'
const uuid4 = require('uuid/v4')
var uuid = uuid4()
const User = require('../models/user')
var jwt = require('jsonwebtoken')
const router = Router()
var bcrypt = require('bcrypt')

router.post('/register', (req, res) => {
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
        return res.json({token: jwt.sign({data: user}, uuid, {expiresIn: '2h'}), id: user._id})
      }
    }
  })
})

router.get('/profileAuth', (req, res) => {
  res.send(['Engr.', 'AbdulGafar Olamide Ajao', 'Horlasco34@gmail.com', '08134549552', 'Nigeria', 'Ogun',
    'Abeokuta', 'P.M.B 1515, Unilorin', '19', 'Male', 'Student', 'Unilorin', 'Variable.inc', 'CEO'])
})
export default router
