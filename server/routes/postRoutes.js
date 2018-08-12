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
            uploaderImg: newPost.uploaderImg,
            time: newPost.time
          }
  // console.log(post)
  Post.create(post, function (err, data) {
    if (err) {
      console.log(err)
      res.send('Unable to create post at this moment, please try again.')
    } else {
      let {
        _id,
        time,
        uploaderImg,
        uploader,
        title,
        description,
        img,
        category,
        comments,
        likes,
        views
      } = data
      let full = []
      let half = []
      let dislike = []
      let post = {
        _id,
        time,
        uploaderImg,
        uploader,
        title,
        description,
        img,
        category,
        comments,
        likes,
        views,
        descriptionStatus: false,
        commentStatus: false,
        hover: false,
        activeImg: 0,
        commentsCount: comments.length
      }
      if (post.likes.length > 0) {
        post.likes.forEach(u => {
          if (u.mode === 'half') {
            half.push(u)
          } else if (u.mode === 'full') {
            full.push(u)
          } else if (u.mode === 'dislike') {
            dislike.push(u)
          }
        })
      }
      post.likesCount = {
        full: full.length, half: half.length, dislike: dislike.length, total: full.length + half.length + dislike.length
      }
      // console.log(post)
      io.emit('post', post)
      // res.send(post)
    }
  })
  // })
})

router.get('/fetchPosts', (req, res) => {
  Post.find(function (err, posts) {
    if (err) {
      console.log(err)
      res.send('Unable to fetch posts at this moment, please try again.')
    } else {
      res.send(posts)
    }
  })
})

router.patch('/comment', (req, res) => {
  let id = req.body.id
  let comment = req.body.comment
  Post.findByIdAndUpdate(id, {$push: {comments: comment}}, {new: true}, (error, result) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else if (result) {
      console.log(result)
      res.send(result)
    }
  })
})

router.patch('/likePost', (req, res) => {
  let id = req.body.id
  let like = req.body.postLike
  Post.findByIdAndUpdate(id, {$push: {likes: like}}, {new: true}, (error, result) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else if (result) {
      console.log(result)
      res.send(result)
    }
  })
})
router.post('/postViews', (req, res) => {
  console.log(req.body)
  let id = req.body.id
  Post.findById(id, function (error, post) {
    if (error) {
      console.log(error)
    } else {
      Post.findByIdAndUpdate(id, {views: post.views + 1}, {new: true}, (er, result) => {
        if (er) {
          console.log(er)
        } else {
          console.log(result)
        }
      })
    }
  })
})

export default router
