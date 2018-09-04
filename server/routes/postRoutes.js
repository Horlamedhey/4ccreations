import {Router} from 'express'
import io from '../index'
// import pass from '../conf'
// import { Promise } from 'mongoose'
const Post = require('../models/post')
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
var upload = multer({storage: storage})

router.post('/newPost', upload.array('images', 2), (req, res) => {
  // console.log(req.files)
  let images = []
  // let counter = 0
  // new Promise(async (resolve, reject) => {
  //   for (let i = 0; i <= req.files.length; i++) {
  //     await uploadinary(req.files[i].path, {public_id: req.files[i].originalname.split('.')[0]}, (error, result) => {
  //       if (error) {
  //         console.log('unable to upload image(s)')
  //         console.log(error)
  //         reject(error)
  //       } else if (result) {
  //         images.push(result.secure_url)
  //         unlink(req.files[i].path)
  //         counter += 1
  //       }
  //     })
  //       .then(result => {
  //         if (counter === req.files.length) {
  //           resolve()
  //         }
  //       })
  //   }
  // })
  //   .then(() => {
  let newPost = JSON.parse(req.body.newPost)
  for (let x = 0; x < req.files.length; x++) {
    images.push(req.files[x].originalname)
  }
  let post =
          {
            title: newPost.title,
            description: newPost.description,
            img: images,
            // img: images,
            category: newPost.category,
            comments: newPost.comments,
            likes: newPost.likes,
            views: newPost.views,
            uploader: newPost.uploader,
            uploaderImg: newPost.uploaderImg
          }
  // console.log(post)
  Post.create(post, function (err, data) {
    if (err) {
      // console.log(err)
      res.send('Unable to create post at this moment, please try again.')
    } else {
      // console.log(post)
      io.emit('post', data)
      res.sendStatus(200)
      // res.send(post)
    }
  })
  // })
})

router.get('/fetchPosts', (req, res) => {
  if (req.url.split('=', 2)[1]) {
    let username = req.url.split('=', 2)[1]
    Post.find({uploader: username}, (error, posts) => {
      if (error) {
        res.sendStatus(404)
        // console.log(error)
      } else if (posts) {
        res.status(200).send(posts)
        // console.log(posts)
      }
    })
  } else if (req.url.split('=', 2)[1] === undefined) {
    Post.find(function (err, posts) {
      if (err) {
        // console.log(err)
        res.send('Unable to fetch posts at this moment, please try again.')
      } else {
        // console.log(posts)
        res.send(posts)
      }
    })
  }
})

router.patch('/comment', (req, res) => {
  let id = req.body.id
  let comment = req.body.comment
  Post.findByIdAndUpdate(id, {$push: {comments: comment}}, {new: true}, (error, result) => {
    if (error) {
      // console.log(error)
      res.sendStatus(500)
    } else if (result) {
      // console.log(result)
      res.sendStatus(200)
      io.emit('comment', {id: result._id, comments: result.comments})
    }
  })
})

router.patch('/likePost', (req, res) => {
  let id = req.body.id
  let like = req.body.postLike
  let type = req.body.type
  if (type === 'existing') {
    Post.findOneAndUpdate({'_id': id, 'likes.liker': like.liker}, {'$set': {'likes.$.mode': like.mode}}, {new: true}, (error, result) => {
      if (error) {
        // console.log(error)
        // res.send(error)
        res.sendStatus(500)
      } else if (result) {
        // console.log(result)
        // res.send(result)
        res.sendStatus(200)
        io.emit('like', {id: result._id, likes: result.likes})
      }
    })
  } else if (type === 'new') {
    Post.findByIdAndUpdate(id, {$push: {likes: like}}, {new: true}, (err, doc) => {
      if (err) {
        // console.log(err)
        // res.send(err)
        res.sendStatus(500)
      } else if (doc) {
        // console.log(doc)
        // res.send(doc)
        res.sendStatus(200)
        io.emit('like', {id: doc._id, likes: doc.likes})
      }
    })
  }
})
router.post('/postViews', (req, res) => {
  let id = req.body.id
  Post.findById(id, function (error, post) {
    if (error) {
      // console.log(error)
      res.sendStatus(500)
    } else {
      Post.findByIdAndUpdate(id, {views: post.views + 1}, {new: true}, (er, result) => {
        if (er) {
          res.sendStatus(500)
          // console.log(er)
        } else {
          // res.send(result)
          res.sendStatus(200)
          io.emit('view', {id: result._id, views: result.views})
        }
      })
    }
  })
})

export default router
