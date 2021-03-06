import { Router } from 'express'
import io from '../index'
var config = require('../conf')
const User = require('../models/user')
const Post = require('../models/post')
// const Place = require('../models/place')
const Location = require('../models/location')
const Newsletter = require('../models/newsletter')
var jwt = require('jsonwebtoken')
const router = Router()

// const fs = require('fs')
// const { promisify } = require('util')
// const unlink = promisify(fs.unlink)
// var cloudinary = require('cloudinary')
// cloudinary.config({
//   cloud_name: 'ccreations',
//   api_key: '915196165249498',
//   api_secret: pass.secret,
//   secure: true
// })
// let uploadinary = cloudinary.v2.uploader.upload
var path = require('path')
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../assets'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

//  Signing up

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
        res.status(406).send('Username already taken.')
      } else {
        res.status(500).send('Internal Server Error! Please try again.')
      }
    } else if (user) {
      // let { username, picture } = user.personalInfo
      // let data = { username, picture }
      req.session.user = jwt.sign({ id: user._id }, config.secret, { expiresIn: '4h' })
      return res.status(200).send({ data: { token: req.session.user } })
    }
  })
})

//  Logging in and out

router.post('/login', (req, res) => {
  User.findOne({ 'personalInfo.username': req.body.username }, function (err, user) {
    if (err) { throw err }
    if (!user) {
      res.status(404).send('Login failed. User not found.')
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(404).send('Login failed. Incorrect Password')
      } else {
        req.session.user = jwt.sign({ id: user._id }, config.secret)
        return res.status(200).send({ user: req.session.user })
      }
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Unable to log you out, please try again.')
    } else {
      res.status(200).send('logging out...')
    }
  })
})

//  User Authentication for accessing the user's profile

router.get('/profileAuth', (req, res) => {
  if (req.session && req.session.user) {
    jwt.verify(req.session.user, config.secret, function (err, decoded) {
      if (err) {
        return res.status(406).send('Unable to verify user, please close this dialog to login again.')
      }
      User.findById(decoded.id, function (err, user) {
        if (err) {
          return res.status(406).send('There was a problem finding user, please try again.')
        } else if (!user) {
          return res.status(406).send('User not found, please register.')
        } else {
          let userData = user.personalInfo
          let id = user._id
          res.json({ user: { userData, id } })
        }
      })
    })
  } else {
    res.status(406).send('User not logged in.')
  }
})

//  Newsletter subscription

router.post('/newsletter', (req, res) => {
  let email = req.body.email
  Newsletter.findByIdAndUpdate('5b724da695198a48632ba51b', { $push: { emails: email } }, { new: true }, (err, result) => {
    if (err) {
      res.sendStatus(500)
    } else if (result) { res.sendStatus(200) }
  })
})

//  Locations for user registration

router.get('/location', (req, res) => {
  Location.find((error, result) => {
    if (error) {
      res.send(error)
    } else if (result) {
      res.send(result)
    }
  })
})

router.patch('/location', (req, res) => {
  let data = req.body
  console.log(data)
  Location.findByIdAndUpdate(data.id.country, { 'States._id': data.id }, (error, result) => {
    if (error) {
      res.send(error)
    } else if (result) {
      res.send(result)
      console.log(result)
    }
  })
})

// router.post('/location', (req, res) => {
//   let {States, CountryName} = req.body
//   let newLocation = {States, CountryName}
//   // console.log(Location)
//   Location.create(newLocation, (err, result) => {
//     if (err) {
//       console.log(err)
//     } else if (result) {
//       console.log(result)
//     }
//   })
// })

//  Editing User profile

//  Changing profile pic

router.post('/changeProfilePic', upload.single('newPic'), (req, res) => {
  let user = req.body.user
  let picture
  if (req.file) {
    picture = req.file.originalname
  } else {
    picture = 'http://byronbayphotographer.com/wp-content/uploads/2017/11/pleasing-mystery-clipart-person-pencil-and-in-color.jpg'
  }
  User.findByIdAndUpdate(user, { $set: { 'personalInfo.picture': picture } }, { new: true }, (err, user) => {
    if (err) {
      res.sendStatus(500)
    } else if (user) {
      //  touching profilePic on all user's posts, comments and likes
      Post.updateMany({ uploader: user.personalInfo.username },
        { $set: { uploaderImg: user.personalInfo.picture } }, (error, result) => {
          if (error) {
            res.sendStatus(500)
          } else if (result) {
            Post.updateMany({ 'comments.commentor': user.personalInfo.username },
              { $set: { 'comments.$.commentorImg': user.personalInfo.picture } }, (error, result) => {
                if (error) {
                  res.sendStatus(500)
                } else if (result) {
                  Post.updateMany({ 'likes.liker': user.personalInfo.username },
                    { $set: { 'likes.$.likerImg': user.personalInfo.picture } }, (error, result) => {
                      if (error) {
                        res.sendStatus(500)
                      } else if (result) {
                        res.sendStatus(200)
                        io.emit('profilePic', { id: user._id, profilePic: user.personalInfo.picture, username: user.personalInfo.username })
                      }
                    })
                }
              })
          }
        })
    }
  })
})

router.patch('/saveUserInfo', (req, res) => {
  console.log(req.body)
  let data = req.body
  User.findByIdAndUpdate(data.id, { $set: { personalInfo: data.personalInfo } }, { new: true }, (error, result) => {
    if (error) {
      res.sendStatus(500)
    } else if (result) {
      res.sendStatus(200)
      // console.log(result)
    }
  })
})
export default router
